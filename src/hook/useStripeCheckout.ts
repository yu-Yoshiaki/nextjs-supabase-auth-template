import axios from "axios";
import { useCallback } from "react";
import type { Stripe } from "stripe";

export const useStripeCheckout = () => {
  const productEndPoint = "/api/checkout/";

  const createCheckoutSession = useCallback(
    async (params: {
      // mode: stripe.Checkout.SessionCreateParams.Mode;
      lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
    }) => {
      const res = await axios.post(productEndPoint + "createSession", params);
      const url: string = await res.data;
      return url;
    },
    []
  );

  return { createCheckoutSession };
};
