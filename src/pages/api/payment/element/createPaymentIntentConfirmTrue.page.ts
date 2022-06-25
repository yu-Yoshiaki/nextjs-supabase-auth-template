import type { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Body = {
  amount: number;
  customer: string;
  paymentMethod: string;
};

const createPaymentIntentConfirmTrue = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const body: Body = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: "jpy",
      customer: body.customer,
      payment_method: body.paymentMethod,
      off_session: true,
      confirm: true,
    });

    res.status(200).json({ status: paymentIntent.status });
  } catch (err: any) {
    // Error code will be authentication_required if authentication is needed
    res.status(err.status || 500).json({ code: err.code });
  }
};

export default createPaymentIntentConfirmTrue;
