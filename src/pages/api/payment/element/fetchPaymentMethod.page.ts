import type { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Body = {
  customer: string;
};
const fetchPaymentMethod = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { customer }: Body = req.body;
  try {
    const paymentMethod = await stripe.customers.listPaymentMethods(customer, {
      type: "card",
    });

    res.status(200).json({ paymentMethod: paymentMethod.data[0].id });
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export default fetchPaymentMethod;
