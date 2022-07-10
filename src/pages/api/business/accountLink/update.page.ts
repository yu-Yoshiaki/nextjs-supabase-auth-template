import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Params = {
  id: string;
};

const createAccountLink = async (req: NextApiRequest, res: NextApiResponse) => {
  const params: Params = req.body;

  if (req.method === "POST") {
    try {
      const { url } = await stripe.accountLinks.create({
        account: params.id,
        refresh_url: `${req.headers.origin}/business/auth/create/?refresh=true`,
        return_url: `${req.headers.origin}/business/auth/create/?return=true`,
        type: "account_update",
      });

      res.status(200).json(url);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default createAccountLink;
