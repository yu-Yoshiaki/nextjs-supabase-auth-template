import type { SetupIntent } from "@stripe/stripe-js";
import type { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Body = {
  customer: string;
};
const createSetupIntent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { customer }: Body = req.body;
  try {
    const { client_secret }: SetupIntent = await stripe.setupIntents.create({
      customer,
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: client_secret });
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export default createSetupIntent;
