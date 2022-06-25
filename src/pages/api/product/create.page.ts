import type { NextApiRequest, NextApiResponse } from "next";
import type { Ticket } from "src/type/ticket";
import type Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const params: Ticket = req.body;

  if (req.method === "POST") {
    try {
      const product = await stripe.products.create({
        active: params.active,
        name: params.name,
        description: params.description,
        metadata: {
          organizer: params.metadata.organizer,
          startDay: params.metadata.startDay ?? null,
          location: params.metadata.location ?? null,
          lat: params.metadata.lat ?? null,
          lng: params.metadata.lng ?? null,
        },
        images: params.images,
      });

      res.status(200).json(product);
    } catch (e: any) {
      res.status(500).json(e.message);
    }
  }
};

export default createProduct;
