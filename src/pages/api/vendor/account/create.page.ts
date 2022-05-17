import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const account = await stripe.accounts.create({
        type: "custom",
      });

      res.status(200).json(account.id);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default createAccount;
