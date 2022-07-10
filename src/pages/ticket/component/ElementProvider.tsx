import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { ReactChild } from "react";
import { usePaymentIntent } from "src/hook/usePaymentIntent";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

type Props = {
  children: ReactChild;
  appearance?: any;
  amount: number;
};

export const ElementProvider = (props: Props) => {
  const { clientSecret } = usePaymentIntent({
    amount: props.amount,
  });

  if (!clientSecret) return <div>Loading...</div>;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: props.appearance,
      }}
    >
      {props.children}
    </Elements>
  );
};
