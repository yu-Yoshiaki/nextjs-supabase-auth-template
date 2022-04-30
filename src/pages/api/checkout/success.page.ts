import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "src/lib/stripe";
import type Stripe from "stripe";

const Success = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionId = req.query.session_id;

  if (req.method === "GET") {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        sessionId as string
      );
      const customer = (await stripe.customers.retrieve(
        session.customer as string
      )) as Stripe.Response<Stripe.Customer>;
      const redirectUrl = `http://yumotoyoshiakinomacbook-pro.local:3000/ticket/checkoutFinish/?success=true&name=${customer.name}`;

      res.redirect(303, redirectUrl);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default Success;
