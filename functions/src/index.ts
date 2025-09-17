import * as functions from "firebase-functions";
import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import * as dotenv from "dotenv";

// Load .env for local testing
dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Environment variables
const PLENTY_URL = process.env.PLENTY_URL!;
const PLENTY_USER = process.env.PLENTY_USER!;
const PLENTY_PASS = process.env.PLENTY_PASS!;

let token: string = "";
let tokenExpiresAt = 0;

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

app.get("/items", async (_req: Request, res: Response) => {
  try {
    const t = await getToken();
    const response = await axios.get(`${PLENTY_URL}/items`, {
      headers: { Authorization: `Bearer ${t}` },
    });
    res.json(response.data);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

export const api = functions.https.onRequest(app);
