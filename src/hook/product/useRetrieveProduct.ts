import axios from "axios";
import { useCallback } from "react";
import type stripe from "stripe";

type RetrieveProduct = (productId: string) => Promise<stripe.Product>;

export const useRetrieveProduct = () => {
  const retrieveProduct: RetrieveProduct = useCallback(async (productId) => {
    const res = await axios.get("/api/product/" + `${productId}` + "/read");
    const data: stripe.Product = await res.data;
    return data;
  }, []);

  return { retrieveProduct };
};
