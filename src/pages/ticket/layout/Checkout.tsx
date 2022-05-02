import axios from "axios";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { useAuth } from "src/hook/useAuth";
import type { ReadPrice, ReadTicket } from "src/type/ticket";
import useSWR from "swr";

const Loading = () => {
  return (
    <div className={`pb-5 border border-gray w-[391px] mx-auto`}>
      <div className="p-2 mb-5 w-full h-[42px] bg-gray animate-pulse"></div>
      <div className="pl-3 mb-10 h-[40px]">
        <div className="w-[180px] h-[25px] bg-gray animate-pulse"></div>
      </div>
      <div className="flex justify-between mr-1 mb-16 ml-3 h-[32px]">
        <div className="py-1 px-2 w-[60px] bg-gray rounded-full animate-pulse"></div>
        <div className="w-[146px] bg-gray animate-pulse"></div>
      </div>

      <div className="flex justify-center items-center">
        <div className="py-4 px-20 w-[256px] h-[58px] bg-gray animate-pulse"></div>
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
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const { data: ticket } = useSWR<ReadTicket>(id as string);
  const { data: prices, error } = useSWR(`/api/fb/price/${id}/get`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!prices) return <Loading />;

  return (
    <div className={`pb-5 border border-gray w-[391px] mx-auto`}>
      <p className={`p-2 mb-5 w-full text-left bg-skyblue`}>配信</p>
      <h3 className={`px-3 mb-10 text-xl w-full h-10 font-bold text-left`}>
        {ticket?.name}
      </h3>
      <div className={`flex justify-between mr-1 mb-16 ml-3`}>
        <p className={`py-1 px-2 w-[60px] text-sm bg-pink rounded-full `}>
          販売中
        </p>
        <p className={`text-2xl font-bold text-right`}>
          {prices[0].unitAmount?.toLocaleString()}円
          <span className={`text-sm`}>（税込）</span>
        </p>
      </div>

      <form
        action={`/api/checkout/${prices[0].id}/${user ?? ""}`}
        method="POST"
        className="flex justify-center items-center"
      >
        <button
          type="submit"
          role="link"
          className={
            "flex justify-center items-center py-4 px-20  text-white bg-blue"
          }
        >
          チケット購入
        </button>
      </form>
    </div>
  );
};
