/* eslint-disable no-console */
import { loadStripe } from "@stripe/stripe-js";
import type { CustomNextPage } from "next";
import { useEffect, useState } from "react";
import { Layout } from "src/layout";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

const CheckoutResult: CustomNextPage = () => {
  const [result, setResult] = useState("");
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setResult("ご購入ありがとうございました。");
    }

    if (query.get("canceled")) {
      setResult("キャンセルいたしました。");
    }
  }, []);

  return <div className="flex justify-center py-[100px] text-3xl font-bold">{result}</div>;
};

CheckoutResult.getLayout = Layout;

export default CheckoutResult;
