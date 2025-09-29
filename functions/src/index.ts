import * as functions from "firebase-functions";
import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import * as dotenv from "dotenv";
import Mollie from "@mollie/api-client";

// Load .env
dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Environment variables
const PLENTY_URL = process.env.PLENTY_URL!;
const PLENTY_USER = process.env.PLENTY_USER!;
const PLENTY_PASS = process.env.PLENTY_PASS!;
const MOLLIE_TEST_API_KEY = process.env.MOLLIE_TEST_API_KEY!;
const BASE_URL = process.env.BASE_URL!;

const mollie = Mollie({ apiKey: MOLLIE_TEST_API_KEY });

let token: string = "";
let tokenExpiresAt = 0;

// Get PlentyONE API token
async function getToken(): Promise<string> {
  const now = Date.now();
  if (token && now < tokenExpiresAt) return token;

  const res = await axios.post(`${PLENTY_URL}/login`, {
    username: PLENTY_USER,
    password: PLENTY_PASS,
  });

  token = res.data.accessToken;
  tokenExpiresAt = now + (res.data.expires_in - 60) * 1000;
  return token;
}

// Categories
app.get("/categories", async (_req: Request, res: Response) => {
  try {
    const t = await getToken();
    const response = await axios.get(`${PLENTY_URL}/categories`, {
      headers: { Authorization: `Bearer ${t}` },
      params: { lang: "en", with: "children" },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Variations
app.get("/variations", async (_req: Request, res: Response) => {
  try {
    const t = await getToken();
    const response = await axios.get(`${PLENTY_URL}/items/variations`, {
      headers: { Authorization: `Bearer ${t}` },
      params: { with: "images,variationSalesPrices,variationCategories,variationAttributeValues,item", lang: "en" },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Attributes
app.get("/attributes", async (_req: Request, res: Response) => {
  try {
    const t = await getToken();
    const response = await axios.get(`${PLENTY_URL}/items/attributes`, {
      headers: { Authorization: `Bearer ${t}` },
      params: { with: "names,values,maps", lang: "en" },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch attributes" });
  }
});

// Item by ID
app.get("/items/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const t = await getToken();
    const response = await axios.get(`${PLENTY_URL}/items/${id}`, {
      headers: { Authorization: `Bearer ${t}` },
      params: { lang: "en", isMain: true },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch item" });
  }
});

// Item variations by ID
app.get("/items/:id/variations", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const t = await getToken();
    const response = await axios.get(`${PLENTY_URL}/items/${id}/variations`, {
      headers: { Authorization: `Bearer ${t}` },
      params: { with: "variationSalesPrices,images,variationAttributeValues,item" },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch item variations" });
  }
});

// Create Mollie payment
app.post("/create-payment", async (req: Request, res: Response) => {
  try {
    const { amount, cartItems, customerId, orderId, description, redirectUrl, currency = "EUR" } = req.body;

    if (!amount || !orderId || !redirectUrl) {
      return res.status(400).json({ error: "Missing required fields: amount, orderId, redirectUrl" });
    }

    const safeDescription =
      typeof description === "string" && description.trim().length > 0
        ? description.trim().slice(0, 255)
        : `Order ${orderId}`;

    const amountStr = typeof amount === "number" ? amount.toFixed(2) : Number(amount).toFixed(2);

        // 1. Create PlentyONE order
    const t = await getToken();
    const newOrder = await axios.post(
      `${PLENTY_URL}/orders`,
      {
        contactId: customerId,
        orderItems: cartItems.map((item: any) => ({
          itemVariationId: item.variationId,
          quantity: item.quantity,
          amount: item.price,
        })),
        referrerId: 1, // webshop ID
      },
      { headers: { Authorization: `Bearer ${t}` } }
    );

    const plentyOrderId = newOrder.data.id;

    const payment = await mollie.payments.create({
      amount: { currency, value: amountStr },
      description: safeDescription,
      redirectUrl,
      webhookUrl: `${BASE_URL}/mollie-webhook`,
      metadata: { orderId: String(plentyOrderId) },
    });

    return res.json({ checkoutUrl: payment.getCheckoutUrl() }); // <-- return here
  } catch (err: any) {
    console.error("Create payment error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to create Mollie payment" }); // <-- return here
  }
});

app.post("/mollie-webhook", async (req: Request, res: Response) => {
  try {
    const paymentId = req.body.id;
    if (!paymentId) return res.status(400).end();

    const payment = await mollie.payments.get(paymentId);
    const metadata = payment.metadata as { orderId?: string } | undefined;
    const orderId = metadata?.orderId;

    if (payment.status === "paid" && orderId) {
      console.log(`Payment succeeded for order ${orderId}`);

      // Mark order as paid in PlentyONE
      const t = await getToken(); // your function to get PlentyONE token
      await axios.put(
        `${PLENTY_URL}/orders/${orderId}/payments`,
        {
          amount: Number(payment.amount.value),
          paymentStatus: "paid",
          paymentMethod: payment.method,
          transactionId: payment.id,
        },
        {
          headers: { Authorization: `Bearer ${t}` },
        }
      );

      console.log(`Order ${orderId} marked as paid in PlentyONE`);
    } else {
      console.log(`Payment not completed: ${payment.status} for order ${orderId}`);
    }

    return res.status(200).end();
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).end();
  }
});

export const api = functions.https.onRequest(app);