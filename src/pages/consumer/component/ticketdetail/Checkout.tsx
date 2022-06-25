import axios from "axios";
import { useRouter } from "next/router";
import type { ReadPrice } from "src/type/ticket";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  const prices: ReadPrice[] = await res.data;
  return prices;
};

export const Checkout = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: prices, error } = useSWR(`/api/fb/price/${id}/get`, fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <div className="p-10 w-full text-center bg-white rounded-md border border-gray-200">
      <form
        action={prices && `/api/payment/checkout/${prices[0].id}`}
        method="POST"
      >
        <div className="mb-4">
          {prices ? (
            <p className={`text-2xl font-semibold`}>
              {prices[0].unitAmount?.toLocaleString()}円
            </p>
          ) : (
            <div className="w-[146px] h-10 bg-gray-200 animate-pulse"></div>
          )}
        </div>
        <button
          type="submit"
          role="link"
          className="py-3 mx-auto w-[200px] text-xl text-center text-white bg-blue-300 rounded-full shadow-md hover:shadow-none"
        >
          チケット購入
        </button>
      </form>
    </div>
  );
};
