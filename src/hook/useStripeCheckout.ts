import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { Stripe } from "stripe";

export const useStripeCheckout = () => {
  const productEndPoint = "/api/checkout/";
  const [checkoutUrl, setCheckoutUrl] = useState<string | undefined>();

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
    setCheckoutUrl(undefined);
    return;
  }, [checkoutUrl]);

  const createCheckoutSession = useCallback(
    async (params: {
      // mode: stripe.Checkout.SessionCreateParams.Mode;
      lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
    }) => {
      const res = await axios.post(productEndPoint + "createSession", params);
      const url: string = await res.data;
      setCheckoutUrl(url);
      return;
    },
    []
  );

  return { createCheckoutSession, checkoutUrl };
};
