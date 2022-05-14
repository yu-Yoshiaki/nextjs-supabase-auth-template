import axios from "axios";
import { useCallback, useState } from "react";
import type { Ticket } from "src/type/ticket";
import type { Stripe } from "stripe";
import type stripe from "stripe";

type StripeProduct = {
  create: (params: Ticket) => Promise<void>;
  retrieve: (productId: string) => Promise<stripe.Product>;
  update: (
    productId: string,
    params: stripe.ProductUpdateParams
  ) => Promise<stripe.Product>;
};

type StripePrice = {
  create: (params: stripe.PriceCreateParams) => Promise<void>;
  retrieve: (priceId: string) => Promise<stripe.Price>;
  update: (
    productId: string,
    params: stripe.PriceUpdateParams
  ) => Promise<stripe.Price>;
};

export const useStripeProducts = () => {
  const [productId, setProducId] = useState<string | undefined>();
  const productEndPoint = "/api/product/";

  const createProduct: StripeProduct["create"] = useCallback(async (params) => {
    const res = await axios.post(productEndPoint + "create", params);
    const data: stripe.Product = await res.data;
    return setProducId(data.id);
  }, []);

  const retrieveProduct: StripeProduct["retrieve"] = useCallback(
    async (productId) => {
      const res = await axios.get(productEndPoint + `${productId}` + "/read");
      const data = await res.data;
      return data as stripe.Product;
    },
    []
  );

  const updateProduct: StripeProduct["update"] = useCallback(
    async (productId, params) => {
      const res = await axios.post(
        productEndPoint + `${productId}` + "/update",
        params
      );
      const data = await res.data;
      return data as stripe.Product;
    },
    []
  );

  const priceEndPoint = "/api/price/";

  const createPrice: StripePrice["create"] = useCallback(async (params) => {
    await axios.post(priceEndPoint + "create", params);
    return;
  }, []);

  const retrievePrice: StripePrice["retrieve"] = useCallback(
    async (priceId) => {
      const res = await axios.get(priceEndPoint + `${priceId}` + "/read");
      const data: Stripe.Price = await res.data;
      setProducId(data.product as string);
      return data;
    },
    []
  );

  const updatePrice: StripePrice["update"] = useCallback(
    async (priceId, params) => {
      const res = await axios.post(
        priceEndPoint + `${priceId}` + "/update",
        params
      );
      const data = await res.data;
      return data as stripe.Price;
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
