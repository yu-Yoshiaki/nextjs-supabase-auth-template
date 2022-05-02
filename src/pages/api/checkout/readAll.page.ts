import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await stripe.checkout.sessions.list();

      res.status(200).json(session);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
}
