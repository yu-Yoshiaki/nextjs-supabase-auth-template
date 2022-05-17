import { useState } from "react";

import { useCreateProduct } from "./useCreateProduct";
import { useRetrieveProduct } from "./useRetrieveProduct";
import { useUpdateProduct } from "./useUpdateProduct";

export const useManageProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();
  const { retrieveProduct } = useRetrieveProduct();

  return {
    createProduct,
    updateProduct,
    retrieveProduct,
    isLoading,
    setIsLoading,
  };
};
