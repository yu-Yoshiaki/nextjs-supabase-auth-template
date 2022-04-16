import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  if (req.method === "POST") {
    try {
      const accountLink = await stripe.accountLinks.create({
        account: id,
        refresh_url: `${req.headers.origin}`,
        return_url: `${req.headers.origin}`,
        type: "account_onboarding",
      });
      // res.redirect(303, accountLink.url);
      res.json(accountLink.url);
      // res.json("https://google.com")
    } catch (e) {
      res.status(500).json(e.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
