import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { id } = req.query as { id: string };
      const account = await stripe.accounts.update(id, {
        metadata: { order_id: "6735" },
      });

      res.status(200).json(account.metadata);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
