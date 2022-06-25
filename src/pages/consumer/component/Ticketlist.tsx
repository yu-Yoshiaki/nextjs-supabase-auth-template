import { fetchCollection } from "src/lib/fetchCollection";
import type { ReadTicket } from "src/type/ticket";
import useSWR from "swr";

import { Card } from "./Card";

export const Ticketlist = () => {
  //SWRConfigで、共通処理になっている。
  const { data: ticketList } = useSWR<ReadTicket[]>("ticket", fetchCollection);

  return (
    <div className="grid gap-4 py-5 mx-auto w-[80%] md:grid-cols-3">
      <div className="hidden w-full md:block">
        <p>絞り込み</p>
        <div className="h-[300px] bg-gray-100 rounded-xl"></div>
      </div>
      <div className="space-y-4 md:col-span-2">
        {ticketList?.map((ticket) => {
          // return <Card ticket={ticket} key={ticket.id} />;
          return <Card {...ticket} key={ticket.id} />;
        })}
      </div>
    </div>
  );
};
