import axios from "axios";
import { useCallback } from "react";
import type { Ticket } from "src/type/ticket";
import type stripe from "stripe";

type CreateProduct = (params: Ticket) => Promise<{ id: string }>;

export const useCreateProduct = () => {
  const createProduct: CreateProduct = useCallback(async (params) => {
    const res = await axios.post("/api/product/create", params);
    const data: stripe.Product = await res.data;
    return { id: data.id };
  }, []);

  return { createProduct };
};
