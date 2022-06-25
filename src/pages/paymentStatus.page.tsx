import { useCallback, useEffect, useState } from "react";

const PaymentStatus = () => {
  const [message, setMessage] = useState<string | null>(null);

  const checkStatus = useCallback(async () => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (clientSecret) setMessage("payment success");
    return;
  }, []);

  useEffect(() => {
    checkStatus;
  }, [checkStatus]);

  return <div>{message ?? "hello"}</div>;
};

export default PaymentStatus;
