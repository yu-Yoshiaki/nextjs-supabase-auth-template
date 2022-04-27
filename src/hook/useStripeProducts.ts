import axios from "axios";
import { useCallback, useState } from "react";
import type { Ticket } from "src/type/ticket";
import type { Stripe } from "stripe";
import type stripe from "stripe";

export const useStripeProducts = () => {
  const [productId, setProducId] = useState<string | undefined>();
  const productEndPoint = "/api/product/";

  const createProduct = useCallback(async (params: Ticket) => {
    const res = await axios.post(productEndPoint + "create", params);
    const data: stripe.Product = await res.data;
    return data;
  }, []);

  const retrieveProduct = useCallback(async (productId: string) => {
    const res = await axios.get(productEndPoint + `${productId}` + "/read");
    const data: stripe.Product = await res.data;
    return data;
  }, []);

  const updateProduct = useCallback(
    async (productId: string, params: stripe.ProductUpdateParams) => {
      const res = await axios.post(
        productEndPoint + `${productId}` + "/update",
        params
      );
      const data: stripe.Product = await res.data;
      return data;
    },
    []
  );

  const priceEndPoint = "/api/price/";

  const createPrice = useCallback(async (params: stripe.PriceCreateParams) => {
    const res = await axios.post(priceEndPoint + "create", params);
    const data: stripe.Price = await res.data;
    return data;
  }, []);

  const retrievePrice = useCallback(async (priceId: string) => {
    const res = await axios.get(priceEndPoint + `${priceId}` + "/read");
    const data: Stripe.Price = await res.data;
    setProducId(data.product as string);
    return data;
  }, []);

  const updatePrice = useCallback(
    async (priceId: string, params: stripe.PriceUpdateParams) => {
      const res = await axios.post(
        priceEndPoint + `${priceId}` + "/update",
        params
      );
      const data: stripe.Price = await res.data;
      return data;
    },
    []
  );

  return {
    retrieveProduct,
    createProduct,
    updateProduct,
    retrievePrice,
    createPrice,
    updatePrice,
    productId,
  };
};
