import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const params: Stripe.AccountCreateParams = req.body;
    try {
      const account = await stripe.accounts.create({
        country: "JP",
        type: "custom",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        ...params,
      });

      res.status(200).json(account.id);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default createAccount;
