import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "src/layout";

type RouteQuery = {
  name?: string;
  success?: boolean;
  canceled?: boolean;
};
const CheckoutResult: CustomNextPage = () => {
  const [result, setResult] = useState("");
  const router = useRouter();
  const {
    name,
    success: isSuccess,
    canceled: isCanceled,
  }: RouteQuery = router.query;

  useEffect(() => {
    if (isSuccess) setResult(`${name ?? ""}様、ご購入ありがとうございました。`);
    if (isCanceled) setResult("キャンセルいたしました。");
  }, [isSuccess, isCanceled, name]);

  return (
    <div>
      <div className="text-3xl font-bold">{result}</div>
    </div>
  );
};

CheckoutResult.getLayout = Layout;

export default CheckoutResult;
