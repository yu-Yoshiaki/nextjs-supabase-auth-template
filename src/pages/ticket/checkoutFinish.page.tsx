/* eslint-disable no-console */
import axios from "axios";
import type { CustomNextPage } from "next";
import { useEffect, useState } from "react";
import { Layout } from "src/layout";
import type Stripe from "stripe";

const CheckoutResult: CustomNextPage = () => {
  const [result, setResult] = useState("");
  const [data, setData] = useState<Stripe.Checkout.Session>();

  const fetchSessionInfo = async (session_id: string) => {
    const res = await axios.post("/api/retrieveSession", { session_id });
    const data = (await res.data) as Stripe.Checkout.Session;
    setData(data);
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setResult("ご購入ありがとうございました。");
      fetchSessionInfo(query.get("session_id") as string);
    }

    if (query.get("canceled")) {
      setResult("キャンセルいたしました。");
    }
  }, []);

  return (
    <div>
      <div className="text-3xl font-bold">{result}</div>
      {data && (
        <div className="w-[80%]">
          <div>購入ID {data.id}</div>
          <div>商品情報 {data.payment_intent}</div>
        </div>
      )}
    </div>
  );
};

CheckoutResult.getLayout = Layout;

export default CheckoutResult;
