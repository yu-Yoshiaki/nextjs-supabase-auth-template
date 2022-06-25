import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useSetupIntent = (props: { customer: string }) => {
  const [clientSecret, setClientSecret] = useState<string>();

  const fetchClientSecretForSetup = useCallback(async () => {
    const res = await axios.post("/api/checkout/createSetupIntent", {
      ...props,
    });
    const { clientSecret }: { clientSecret: string } = res.data;
    setClientSecret(clientSecret);
    return;
  }, [props]);

  useEffect(() => {
    fetchClientSecretForSetup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { clientSecret, fetchClientSecretForSetup };
};
