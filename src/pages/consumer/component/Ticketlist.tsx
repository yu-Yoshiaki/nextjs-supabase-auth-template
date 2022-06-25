import { fetchCollection } from "src/lib/fetchCollection";
import type { ReadTicket } from "src/type/ticket";
import useSWR from "swr";

import { Card } from "./Card";

export const Ticketlist = () => {
  //SWRConfigで、共通処理になっている。
  const { data: ticketList } = useSWR<ReadTicket[]>("ticket", fetchCollection);

  return (
    <div className="grid grid-cols-3 gap-4 py-5 mx-auto w-[80%]">
      <div className="w-full ">
        <p>絞り込み</p>
        <div className="h-[300px] bg-gray-100 rounded-xl"></div>
      </div>
      <div className="col-span-2 space-y-4">
        {ticketList?.map((ticket) => {
          // return <Card ticket={ticket} key={ticket.id} />;
          return <Card {...ticket} key={ticket.id} />;
        })}
      </div>
    </div>
  );
};
