import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "src/lib/stripe";

const createCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { price } = req.query;
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        success_url: `${req.headers.origin}/api/checkout/success/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/ticket/checkoutFinish/?canceled=true`,
        mode: "payment",
        line_items: [
          {
            price: price as string,
            quantity: 1,
          },
        ],
      });

      res.redirect(303, session.url as string);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default createCheckoutSession;
