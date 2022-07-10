/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const usePaymentIntent = (props: {
  amount: number;
  paymentMethod?: string;
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const fetchClientSecretForPayment = useCallback(async () => {
    const res = await axios.post<{ clientSecret: string | null }>(
      "/api/payment/element/createPaymentIntent",
      {
        ...props,
      }
    );

    const { clientSecret } = res.data;

    if (!clientSecret) return;
    setClientSecret(clientSecret);
  }, [props]);

  useEffect(() => {
    fetchClientSecretForPayment();
  }, []);

  return { clientSecret };
};
