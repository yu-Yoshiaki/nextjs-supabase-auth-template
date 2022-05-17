import axios from "axios";
import { useCallback } from "react";
import type stripe from "stripe";

type RetrievePrice = (priceId: string) => Promise<stripe.Price>;

export const useRetrievePrice = () => {
  const retrievePrice: RetrievePrice = useCallback(async (priceId) => {
    const res = await axios.get("/api/price/" + `${priceId}` + "/read");
    const data: stripe.Price = await res.data;
    return data;
  }, []);

  return { retrievePrice };
};
