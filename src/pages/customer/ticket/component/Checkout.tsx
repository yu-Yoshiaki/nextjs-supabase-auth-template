import axios from "axios";
import { useRouter } from "next/router";
import type { VFC } from "react";
import type { ReadPrice } from "src/type/ticket";
import useSWR from "swr";

const Loading = () => {
  return (
    <div className={`pb-5 border border-gray w-full max-w-[391px] mx-auto`}>
      <div className="p-2 mb-5 w-full h-[42px] bg-gray-100 animate-pulse"></div>
      <div className="pl-3 mb-10 h-[40px]">
        <div className="w-[180px] h-[25px] bg-gray-100 animate-pulse"></div>
      </div>
      <div className="flex justify-between mr-1 mb-16 ml-3 h-[32px]">
        <div className="py-1 px-2 w-[60px] bg-gray-100 rounded-full animate-pulse"></div>
        <div className="w-[146px] bg-gray-100 animate-pulse"></div>
      </div>

      <div className="flex justify-center items-center">
        <div className="py-4 px-20 w-[256px] h-[58px] bg-gray-100 animate-pulse"></div>
      </div>
    </div>
  );
};
const fetcher = async (url: string) => {
  const res = await axios.get(url);
  const prices: ReadPrice[] = await res.data;
  return prices;
};

export const Checkout: VFC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: prices, error } = useSWR(`/api/fb/price/${id}/get`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!prices) return <Loading />;

  return (
    <div className="py-20 space-y-5 bg-white rounded-md shadow-md">
      <form
        action={`/api/checkout/${prices[0].id}`}
        method="POST"
        className="flex justify-center items-center"
      >
        <button type="submit" role="link" className="space-y-5">
          <p className={`text-5xl font-bold text-right`}>
            <span className={`text-sm`}>（税込）</span>
            {prices[0].unitAmount?.toLocaleString()}円
          </p>
          <p className="py-3 mx-auto w-[200px] text-xl text-white bg-blue-300 rounded-md">
            チケット購入
          </p>
        </button>
      </form>
    </div>
  );
};
