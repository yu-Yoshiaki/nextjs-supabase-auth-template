import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const params: Stripe.PriceCreateParams = req.body;

  if (req.method === "POST") {
    try {
      const price = await stripe.prices.create(params);

      res.status(200).json(price.id);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
};

export default createProduct;
