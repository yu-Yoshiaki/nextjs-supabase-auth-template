import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Body = {
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body: Body = req.body;
    try {
      const accout = await stripe.accounts.create({
        type: "express",
        email: body?.email ?? "test@example.com",
      });

      res.status(200).json({ id: accout.id });
    } catch (e) {
      res.status(500).json(e.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
