import * as functions from "firebase-functions";
import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import * as dotenv from "dotenv";
import Mollie from "@mollie/api-client";
// import jwt from "jsonwebtoken";
import { MOLLIE_PAYMENT_METHODS } from "./models/MollieMethods";


// Load .env
dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Environment variables
const PLENTY_URL = process.env.PLENTY_URL!;
const PLENTY_USER = process.env.PLENTY_USER!;
const PLENTY_PASS = process.env.PLENTY_PASS!;
// const MOLLIE_TEST_KEY = process.env.MOLLIE_TEST_KEY!;
const MOLLIE_KEY = process.env.MOLLIE_KEY!;
const BASE_URL = process.env.BASE_URL!;
// const JWT_SECRET = process.env.JWT_SECRET!;

const mollie = Mollie({ apiKey: MOLLIE_KEY });

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
    
    // Add totalsPages to response
    const responseData = {
      ...response.data,
      totalsPages: Math.ceil((response.data.totalsCount || 0) / itemsPerPage)
    };
    
    res.json(responseData);
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
    
    // Add totalsPages to response
    const responseData = {
      ...response.data,
      totalsPages: Math.ceil((response.data.totalsCount || 0) / itemsPerPage)
    };
    
    res.json(responseData);
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
    
    // Add totalsPages to response
    const responseData = {
      ...response.data,
      totalsPages: Math.ceil((response.data.totalsCount || 0) / itemsPerPage)
    };
    
    res.json(responseData);
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
    const { orderItems, billing, delivery, redirectUrl, promocode } = req.body;

    if (!orderItems || !billing || !redirectUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const t = await getToken();

    // ----------------- CREATE GUEST CONTACT -----------------
    const contactRes = await axios.post(
      `${PLENTY_URL}/accounts/contacts`,
      {
        referrerId: 0,
        plentyId: 71471,
        reffererId: 178,
        typeId: 2,            // guest
        firstName: billing.name1,
        lastName: billing.name2,
        options: [ 
          { typeId: 1, subTypeId: 2, value: billing.email, priority: 1 },
          { typeId: 2, subTypeId: 1, value: billing.phone, priority: 1 }
        ]
      },
      { headers: { Authorization: `Bearer ${t}` } }
    );
    const contactId = contactRes.data.id;

    // ----------------- CREATE BILLING ADDRESS -----------------
    const billingRes = await axios.post(
      `${PLENTY_URL}/accounts/contacts/${contactId}/addresses`,
      { name1: billing.name1, 
        name2: billing.name2, 
        name3: billing.name3, 
        address1: billing.address1,
        address2: billing.address2,
        zip: billing.zip, 
        town: billing.town, 
        countryId: billing.countryId,
        options: [ 
            { id: 8, typeId: "4", value: billing.phone },
            { id: 10, typeId: "5", value: billing.email }
          ]
      },
      { headers: { Authorization: `Bearer ${t}` } }
    );
    const billingId = billingRes.data.id;

    // ----------------- CREATE DELIVERY ADDRESS -----------------
    let deliveryId = billingId;
    if (delivery) {
      const deliveryRes = await axios.post(
        `${PLENTY_URL}/accounts/contacts/${contactId}/addresses`,
        { name1: billing.name1, 
          name2: billing.name2, 
          name3: billing.name3, 
          address1: billing.address1,
          address2: billing.address2,
          zip: billing.zip, 
          town: billing.town, 
          countryId: billing.countryId,
          options: [ 
            { id: 8, typeId: "4", value: billing.phone },
            { id: 10, typeId: "5", value: billing.email }
          ]
        },
        { headers: { Authorization: `Bearer ${t}` } }
      );
      deliveryId = deliveryRes.data.id;
    }

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

    // ----------------- PROMOCODE DISCOUNT -----------------
    let discount = 0;
    if (promocode) {
      const promoCodes = {
        "SOG15": 0.15, // 15% discount
      };

      const upperCode = promocode.toUpperCase();
      discount = promoCodes[upperCode as keyof typeof promoCodes] || 0;
    }

    const discountAmount = amount * discount;
    const finalAmount = amount - discountAmount;

    // ----------------- CREATE MOLLIE PAYMENT -----------------
    const payment = await mollie.payments.create({
      amount: { currency: "EUR", value: Number(finalAmount).toFixed(2) },
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
        const mollieMethodKey = payment.method;
        const matchedMethod = MOLLIE_PAYMENT_METHODS.find(m => m.paymentKey === mollieMethodKey)
        const methodId = matchedMethod?.id;

        const paymentPayload: any = {
          amount: payment.amount.value,
          currency: payment.amount.currency,
          exchangeRatio: 1,
          status: 3,
          transactionType: 1,
          mopId: methodId,
          hash: Date.now().toString(),
          order: { orderId: plentyOrderId },
        };

        console.log("Recording payment for Plenty order:", plentyOrderId);

        await axios.post(
          `${PLENTY_URL}/payments`,
          paymentPayload,
          { headers: { Authorization: `Bearer ${t}` } }
        );
      }
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    return res.sendStatus(500);
  }
});

// Subscribe to newsletter
app.post("/subscribe", async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const t = await getToken();

    // Create newsletter subscriber contact
    const contactRes = await axios.post(
      `${PLENTY_URL}/accounts/contacts`,
      {
        referrerId: 0,
        typeId: 2,            // guest
        firstName: firstName || "",
        lastName: lastName || "",
        options: [
          {
            typeId: 2,
            subTypeId: 1,
            value: email,
            priority: 1
          }
        ]
      },
      { headers: { Authorization: `Bearer ${t}` } }
    );

    return res.json({ 
      success: true, 
      message: "Successfully subscribed to newsletter",
      contactId: contactRes.data.id 
    });

  } catch (err: any) {
    console.error("Newsletter subscription error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to subscribe to newsletter" });
  }
});

// Validate promocode
app.post("/validate-promocode", async (req: Request, res: Response) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Promocode is required" });
    }

    // Hardcoded promocodes
    const promoCodes = {
      "sog15": {
        discount: 0.15, // 15% discount
        type: "percentage"
      }
    };

    const lowerCode = code.toLowerCase();
    const promoData = promoCodes[lowerCode as keyof typeof promoCodes];

    if (!promoData) {
      return res.status(404).json({ error: "Invalid promocode" });
    }

    const discountAmount = subtotal * promoData.discount;
    const finalAmount = subtotal - discountAmount;

    return res.json({
      valid: true,
      code: lowerCode,
      discount: promoData.discount,
      discountAmount: discountAmount,
      finalAmount: finalAmount
    });

  } catch (err: any) {
    console.error("Promocode validation error:", err);
    return res.status(500).json({ error: "Failed to validate promocode" });
  }
});

// Search items
app.get("/search", async (req: Request, res: Response) => {
  try {
    const { q, page = 1, itemsPerPage = 12 } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: "Search query is required" });
    }

    const t = await getToken();
    
    // Fetch all items with a large itemsPerPage to get comprehensive results
    const response = await axios.get(`${PLENTY_URL}/items`, {
      headers: { Authorization: `Bearer ${t}` },
      params: {
        with: "itemImages,texts",
        lang: "en",
        itemsPerPage: 100, // Fetch more items to have enough for filtering
      },
    });
    
    // Filter items by search query on the server side
    const searchTerm = q.toLowerCase().trim();
    const filteredEntries = (response.data.entries || []).filter((item: any) => {
      const itemName = (item.texts?.[0]?.name1 || '').toLowerCase();
      const itemDescription = (item.texts?.[0]?.description || '').toLowerCase();
      
      // Check if search term matches any part of the name or description
      return itemName.includes(searchTerm) || 
             itemDescription.includes(searchTerm) ||
             // Also check if any word in the search term matches
             searchTerm.split(' ').some(word => 
               word.length > 0 && (itemName.includes(word) || itemDescription.includes(word))
             );
    });
    
    // Apply pagination to filtered results
    const startIndex = (parseInt(page as string) - 1) * parseInt(itemsPerPage as string);
    const endIndex = startIndex + parseInt(itemsPerPage as string);
    const paginatedEntries = filteredEntries.slice(startIndex, endIndex);
    
    // Return response in the same format as the original API
    const result = {
      ...response.data,
      entries: paginatedEntries,
      totalsCount: filteredEntries.length,
      page: parseInt(page as string),
      itemsPerPage: parseInt(itemsPerPage as string),
      totalsPages: Math.ceil(filteredEntries.length / parseInt(itemsPerPage as string))
    };
    
    return res.json(result);
  } catch (err: any) {
    console.error("Search error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to search items" });
  }
});

export const api = functions.https.onRequest(app);