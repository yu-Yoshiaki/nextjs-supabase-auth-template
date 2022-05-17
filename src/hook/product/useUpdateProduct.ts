import axios from "axios";
import { useCallback } from "react";
import type stripe from "stripe";

type UpdateProduct = (
  productId: string,
  params: stripe.ProductUpdateParams
) => Promise<stripe.Product>;

export const useUpdateProduct = () => {
  const updateProduct: UpdateProduct = useCallback(
    async (productId, params) => {
      const res = await axios.post(
        "/api/product/" + `${productId}` + "/update",
        params
      );
      const data: stripe.Product = await res.data;
      return data;
    },
    []
  );

  return { updateProduct };
};
