import * as functions from "firebase-functions";
import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import * as dotenv from "dotenv";
import Mollie from "@mollie/api-client";
// import jwt from "jsonwebtoken";

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
// const JWT_SECRET = process.env.JWT_SECRET!;

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

// // ----------------- SIGNUP -----------------
// app.post("/signup", async (req: Request, res: Response) => {
//   try {
//     const { email, password, firstName, lastName } = req.body;
//     if (!email || !password || !firstName || !lastName) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const t = await getToken();

//     // 1. Create Contact
//     const contactRes = await axios.post(
//       `${PLENTY_URL}/accounts/contacts`,
//       {
//         firstName,
//         lastName,
//         typeId: 1,        // person
//         referrerId: 1,    // your webshop ID
//         email,
//       },
//       { headers: { Authorization: `Bearer ${t}` } }
//     );

//     const contactId = contactRes.data.id;

//     // 2. Create Account linked to Contact
//     const accountRes = await axios.post(
//       `${PLENTY_URL}/accounts`,
//       {
//         contactId,
//         loginName: email,
//         password,
//         active: true,
//       },
//       { headers: { Authorization: `Bearer ${t}` } }
//     );

//     const accountId = accountRes.data.id;

//     // 3. Generate JWT for frontend
//     const jwtToken = jwt.sign({ accountId, contactId, email }, JWT_SECRET, { expiresIn: "7d" });

//     return res.json({ token: jwtToken, accountId, contactId, email });
//   } catch (err: any) {
//     console.error("Signup error:", err.response?.data || err.message);
//     return res.status(500).json({ error: "Failed to signup user" });
//   }
// });

// // ----------------- LOGIN -----------------
// app.post("/login", async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: "Missing email or password" });
//     }

//     const t = await getToken();

//     // Login via PlentyONE
//     const loginRes = await axios.post(
//       `${PLENTY_URL}/login`,
//       { username: email, password },
//       { headers: { Authorization: `Bearer ${t}` } }
//     );

//     const accountData = loginRes.data;
//     if (!accountData || !accountData.id) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const jwtToken = jwt.sign(
//       { accountId: accountData.id, contactId: accountData.contactId, email },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.json({ token: jwtToken, accountId: accountData.id, contactId: accountData.contactId, email });
//   } catch (err: any) {
//     console.error("Login error:", err.response?.data || err.message);
//     return res.status(401).json({ error: "Invalid credentials" });
//   }
// });

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
app.get("/variations/men", async (req: Request, res: Response) => {
  try {
    const t = await getToken();
    const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 9; // Default to 9 for both desktop and mobile
    const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
    const response = await axios.get(`${PLENTY_URL}/items/variations`, {
      headers: { Authorization: `Bearer ${t}` },
      params: {
        with: "images,variationSalesPrices,variationCategories,variationAttributeValues,item",
        lang: "en",
        categoryId: 99,
        isMain: true,
        itemsPerPage,
        page,
      },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

app.get("/variations/women", async (req: Request, res: Response) => {
  try {
    const t = await getToken();
    const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 9; // Default to 9 for both desktop and mobile
    const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
    const response = await axios.get(`${PLENTY_URL}/items/variations`, {
      headers: { Authorization: `Bearer ${t}` },
      params: {
        with: "images,variationSalesPrices,variationCategories,variationAttributeValues,item",
        lang: "en",
        categoryId: 100,
        isMain: true,
        itemsPerPage,
        page,
      },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

app.get("/variations/kids", async (req: Request, res: Response) => {
  try {
    const t = await getToken();
    const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 9; // Default to 9 for both desktop and mobile
    const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
    const response = await axios.get(`${PLENTY_URL}/items/variations`, {
      headers: { Authorization: `Bearer ${t}` },
      params: {
        with: "images,variationSalesPrices,variationCategories,variationAttributeValues,item",
        lang: "en",
        categoryId: 101,
        isMain: true,
        itemsPerPage,
        page,
      },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

app.get("/variations/new", async (req: Request, res: Response) => {
  try {
    const t = await getToken();
    const itemsPerPage = 4; // Default to 4 for new arrivals
    const response = await axios.get(`${PLENTY_URL}/items/variations`, {
      headers: { Authorization: `Bearer ${t}` },
      params: {
        with: "images,variationSalesPrices,variationCategories,variationAttributeValues,item",
        lang: "en",
        isMain: true,
        itemsPerPage,
      },
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

app.post("/create-payment", async (req: Request, res: Response) => {
  try {
    const { orderItems, billing, delivery, redirectUrl } = req.body;

    if (!orderItems || !billing || !redirectUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const t = await getToken();

    console.log("Creating order with items:", orderItems, "billing:", billing, "delivery:", delivery);

    // ----------------- CREATE GUEST CONTACT -----------------
    const contactRes = await axios.post(
      `${PLENTY_URL}/accounts/contacts`,
      {
        referrerId: 0,
        typeId: 2,            // guest
        firstName: billing.firstName,
        lastName: billing.lastName,
        options:[
           {
              typeId: 1,
              subTypeId: 2,
              value: billing.phone || "",
              priority: 1
          },
          {
              typeId: 2,
              subTypeId: 1,
              value: billing.email || "",
              priority: 2
          }
        ]
      },
      { headers: { Authorization: `Bearer ${t}` } }
    );
    const contactId = contactRes.data.id;

    console.log("Created guest contact ID:", contactId);

    // ----------------- CREATE BILLING ADDRESS -----------------
    const billingRes = await axios.post(
      `${PLENTY_URL}/accounts/contacts/${contactId}/addresses`,
      billing,
      { headers: { Authorization: `Bearer ${t}` } }
    );
    const billingId = billingRes.data.id;

    console.log("Created billing address ID:", billingId);

    // ----------------- CREATE DELIVERY ADDRESS -----------------
    let deliveryId = billingId;
    if (delivery) {
      const deliveryRes = await axios.post(
        `${PLENTY_URL}/accounts/contacts/${contactId}/addresses`,
        delivery,
        { headers: { Authorization: `Bearer ${t}` } }
      );
      deliveryId = deliveryRes.data.id;
    }

    console.log("Using delivery address ID:", deliveryId);

    // ----------------- CREATE ORDER -----------------
    const orderRes = await axios.post(
      `${PLENTY_URL}/orders`,
      {
        typeId: 1,       // guest order
        plentyId: 71471,     // open
        ownerId: "10",
        orderItems: orderItems,
        addressRelations: [
          { typeId: 1, addressId: billingId, isDefault: true },   // billing
          { typeId: 2, addressId: deliveryId, isDefault: true },  // delivery
        ],
      },
      { headers: { Authorization: `Bearer ${t}` } }
    );

    const plentyOrderId = orderRes.data.id;

    var totalAmount = 0;
    orderItems.forEach((item: any) => {
      totalAmount += item.quantity * item.amounts[0].priceOriginalGross;
    });
    const amount = totalAmount;

    // ----------------- CREATE MOLLIE PAYMENT -----------------
    const payment = await mollie.payments.create({
      amount: { currency: "EUR", value: Number(amount).toFixed(2) },
      description: `Order ${plentyOrderId}`,
      redirectUrl,
      webhookUrl: `${BASE_URL}/mollie-webhook`,
      metadata: { orderId: String(plentyOrderId) },
    });

    return res.json({
      orderId: plentyOrderId,
      contactId,
      checkoutUrl: payment.getCheckoutUrl(),
    });

  } catch (err: any) {
    console.error("Create payment error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to create payment" });
  }
});

app.post("/mollie-webhook", async (req, res) => {
  const paymentId = req.body.id;

  try {
    const payment = await mollie.payments.get(paymentId);

    if (payment.status === "paid") {
      const plentyOrderId = (payment.metadata as { orderId?: string })?.orderId;

      if (plentyOrderId) {
        const t = await getToken();
        await axios.put(
          `${PLENTY_URL}/orders/${plentyOrderId}`,
          { statusId: 3.2 },
          { headers: { Authorization: `Bearer ${t}` } }
        );
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(500);
  }
});

export const api = functions.https.onRequest(app);