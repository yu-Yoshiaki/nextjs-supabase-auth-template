import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type CreateProduct = {
  productName: string;
  owner: string;
  unitAmount: number;
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { productName, owner, unitAmount } = req.body as CreateProduct;

  if (req.method === "POST") {
    try {
      const product = await stripe.products.create({
        name: productName,
        metadata: {
          owner,
        },
      });

      const price = await stripe.prices.create({
        unit_amount: unitAmount,
        currency: "jpy",
        product: product.id,
      });

      res.status(200).json(price.id);
    } catch {
      res.status(500).json("error");
    }
  }
};

export default createProduct;
