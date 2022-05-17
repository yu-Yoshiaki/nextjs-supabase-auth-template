import { useState } from "react";

import { useCreatePrice } from "./useCreatePrice";
import { useRetrievePrice } from "./useRetrievePrice";
import { useUpdatePrice } from "./useUpdatePrice";

export const useManagePrice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createPrice } = useCreatePrice();
  const { retrievePrice } = useRetrievePrice();
  const { updatePrice } = useUpdatePrice();

  return {
    createPrice,
    retrievePrice,
    updatePrice,
    isLoading,
    setIsLoading,
  };
};
