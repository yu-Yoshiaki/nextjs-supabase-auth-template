import type Stripe from "stripe";

export const stripe: Stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY as string
);
