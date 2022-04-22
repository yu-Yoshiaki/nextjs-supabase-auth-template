import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const params: Stripe.ProductCreateParams = req.body;

  if (req.method === "POST") {
    try {
      const product = await stripe.products.create(params);

      res.status(200).json(product);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default createProduct;
