import axios from "axios";
import type { VFC } from "react";
import { useCallback, useEffect, useState } from "react";
import type { ReadPrice } from "src/type/ticket";

type Checkout = {
  name: string;
  id: string;
};

const Loding = () => {
  return (
    <div>
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

export const Checkout: VFC<Checkout> = (props) => {
  const [prices, setPrices] = useState<ReadPrice[]>();

  const fetchPrices = useCallback(async () => {
    const res = await axios.get(`/api/fb/price/${props.id}/get`);
    const prices: ReadPrice[] = await res.data;
    setPrices(prices);
  }, [props.id]);

  useEffect(() => {
    setTimeout(() => {
      fetchPrices();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`pb-5 border border-gray`}>
      {prices ? (
        <div>
          <p className={`p-2 mb-5 w-full text-left bg-skyblue`}>配信</p>
          <h3 className={`px-3 mb-10 text-xl w-full h-10 font-bold text-left`}>
            {props.name}
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
            action={`/api/checkout/${prices[0].id}`}
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
      ) : (
        <Loding />
      )}
    </div>
  );
};
