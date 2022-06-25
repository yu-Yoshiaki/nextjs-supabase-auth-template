/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const usePaymentIntent = (props: {
  amount: number;
  paymentMethod?: string;
}) => {
  const [clientSecret, setClientSecret] = useState<string>();

  const fetchClientSecretForPayment = useCallback(async () => {
    const res = await axios.post("/api/payment/element/createPaymentIntent", {
      ...props,
    });

    const { clientSecret }: { clientSecret: string } = res.data;
    setClientSecret(clientSecret);
    return;
  }, [props]);

  useEffect(() => {
    fetchClientSecretForPayment();
  }, []);

  return { clientSecret, fetchClientSecretForPayment };
};
