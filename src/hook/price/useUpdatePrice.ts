import axios from "axios";
import { useCallback } from "react";
import type stripe from "stripe";

type UpdatePrice = (
  productId: string,
  params: stripe.PriceUpdateParams
) => Promise<stripe.Price>;

export const useUpdatePrice = () => {
  const updatePrice: UpdatePrice = useCallback(async (priceId, params) => {
    const res = await axios.post(
      "/api/price/" + `${priceId}` + "/update",
      params
    );
    const data = await res.data;
    return data as stripe.Price;
  }, []);

  return { updatePrice };
};
