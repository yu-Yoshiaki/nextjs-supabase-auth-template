import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const params: {
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
  } = req.body;

  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        success_url: `${req.headers.origin}/ticket/checkoutFinish/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/ticket/checkoutFinish/?canceled=true`,
        mode: "payment",
        line_items: params.lineItems,
      });

      // res.redirect(303, session.url as string);
      // できればサーバー側でリダイレクトしたい（sessionUrlをフロントで表示していいのか？）
      // フロントでfetchやaxiosを使うとリダイレクトできない・・・
      res.status(200).json({ sessionUrl: session.url as string });
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default createCheckoutSession;
