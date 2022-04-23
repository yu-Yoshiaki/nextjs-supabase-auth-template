import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "src/lib/stripe";
import type Stripe from "stripe";

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
      res.status(200).json(session.url as string);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default createCheckoutSession;
