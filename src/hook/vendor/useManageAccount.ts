import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import type Stripe from "stripe";

export const useManageAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createAccount = useCallback(
    async (params: Stripe.AccountCreateParams) => {
      const res = await axios.post("/api/vendor/account/create", params);
      const id: string = await res.data;
      return { id };
    },
    []
  );

  const createAccountLink = useCallback(
    async (id: string) => {
      const res = await axios.post("/api/vendor/accountLink/create", { id });
      const url: string = await res.data;
      return router.push(url);
    },
    [router]
  );

  return {
    createAccount,
    createAccountLink,
    isLoading,
    setIsLoading,
  };
};
