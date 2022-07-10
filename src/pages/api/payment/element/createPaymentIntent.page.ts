import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Body = {
  amount: number;
  paymentMethod?: string;
};

const createPaymentIntent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const body: Body = req.body;

  try {
    const { client_secret } = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: "jpy",
      payment_method_types: ["card", "konbini"],
    });

    res.status(200).json({ clientSecret: client_secret });
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export default createPaymentIntent;
