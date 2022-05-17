import axios from "axios";
import { useCallback } from "react";
import type stripe from "stripe";

type CreatePrice = (params: stripe.PriceCreateParams) => Promise<void>;

export const useCreatePrice = () => {
  const createPrice: CreatePrice = useCallback(async (params) => {
    await axios.post("/api/price/create", params);
    return;
  }, []);

  return { createPrice };
};
