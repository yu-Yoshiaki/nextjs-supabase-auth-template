import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.query as { id: string };
    const params: Stripe.PriceUpdateParams = req.body;
    const price = await stripe.prices.update(id, params);

    res.status(200).json(price);
  }
}
