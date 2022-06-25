import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { ReactChild } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export const ElementProvider = (props: {
  children: ReactChild;
  clientSecret: string;
  appearance?: any;
}) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: props.clientSecret,
        appearance: props.appearance,
      }}
    >
      {props.children}
    </Elements>
  );
};
