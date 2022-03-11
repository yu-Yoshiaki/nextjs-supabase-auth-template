/* eslint-disable no-console */
import { loadStripe } from "@stripe/stripe-js";
import type { CustomNextPage } from "next";
import { useEffect } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const list = [
  { id: "price_1KbnXEIECqNI7FWX9LKLkiZG" },
  { id: "price_1Kbn7sIECqNI7FWX9kR7zLay" },
  { id: "price_1KaIMwIECqNI7FWX3tDgT79m" },
];

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);
const TestIndex: CustomNextPage = () => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      console.log("Order canceled -- continue to shop around and checkout when you’re ready.");
    }
  }, []);

  return (
    <form action={`/api/checkout_session/${list[0].id}`} method={"POST"}>
      <button type="submit" role="link">
        Checkout
      </button>
    </form>
  );
};

export default TestIndex;
//
