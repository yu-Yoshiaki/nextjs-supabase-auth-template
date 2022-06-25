/* eslint-disable @typescript-eslint/naming-convention */
import {
  PaymentElement as PaymentElementForm,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { usePaymentIntent } from "src/hook/usePaymentIntent";
import { ElementProvider } from "src/pages/consumer/component/component/ElementProvider";

import { Loading } from "../Loading";

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

    const { error } = await stripe.confirmPayment({
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
    <div className="p-8 mx-auto md:p-20 md:w-[700px]">
      <p className="text-red-300">{errorMessage}</p>
      <PaymentElementForm />
      <button
        onClick={handleSubmit}
        className="p-4 mt-8 w-full text-white bg-blue-400 rounded-lg"
      >
        購入
      </button>
    </div>
  );
};

export const PaymentElement = (props: {
  amount: number;
  paymentMethod?: string;
}) => {
  const { clientSecret } = usePaymentIntent({
    ...props,
  });
  const appearance = {
    theme: "stripe",
    variables: {
      paddingY: 10,
      colorPrimary: "#0570de",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      fontSizeBase: "1.2rem",
      spacingUnit: "4px",
      borderRadius: "8px",
      // See all possible variables below
    },
  };

  if (!clientSecret) return <Loading />;

  return (
    <ElementProvider clientSecret={clientSecret} appearance={appearance}>
      <Form />
    </ElementProvider>
  );
};
