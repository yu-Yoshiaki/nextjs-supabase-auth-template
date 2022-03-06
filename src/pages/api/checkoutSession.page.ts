import type { NextApiRequest, NextApiResponse } from "next";
import type { Ticket } from "src/type/ticket";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const checkoutSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const { stripePriceId } = req.body as Ticket;

  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: stripePriceId,
            quantity: 1,
          },
        ],

        mode: "payment",
        success_url: `${req.headers.origin}/ticket/checkout/?success=true`,
        cancel_url: `${req.headers.origin}/ticket/checkout/?canceled=true`,
      });

      res.status(200).json(session.url);
    } catch {
      res.status(500).json("errorMessage");
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default checkoutSession;
