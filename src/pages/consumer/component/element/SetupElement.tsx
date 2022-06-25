import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSetupIntent } from "src/hook/useSetupIntent";

import { ElementProvider } from "./ElementProvider";

const Form = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        return_url: "http://localhost:3000/paymentStatus",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="p-20">
      <p className="text-red-300">{errorMessage}</p>
      <PaymentElement />
      <button onClick={handleSubmit} className="p-4 text-blue-300">
        Submit
      </button>
    </div>
  );
};

export const SetupElement = (props: { customer: string }) => {
  const { clientSecret } = useSetupIntent({ ...props });

  if (!clientSecret) return <div>Loading...</div>;

  return (
    <ElementProvider clientSecret={clientSecret}>
      <Form />
    </ElementProvider>
  );
};
