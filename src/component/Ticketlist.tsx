import { supabase } from "src/lib/supabase";
import type { Data } from "src/pages/index.page";
import useSWR from "swr";

import { Card } from "./Card";

const fetchFunc = async (url: string) => {
  const { data } = await supabase
    .from<Data>(url)
    .select("*, prices(id, unit_amount)")
    .eq("active", "true");

  return data;
};

export const Ticketlist = () => {
  //SWRConfigで、共通処理になっている。
  const { data } = useSWR("products", fetchFunc);

  return (
    <div className="grid gap-4 py-5 mx-auto w-[90%] md:grid-cols-3 md:w-[80%]">
      <div className="hidden w-full md:block">
        <p>絞り込み</p>
        <div className="h-[300px] bg-gray-100 rounded-xl"></div>
      </div>
      <div className="space-y-4 md:col-span-2">
        {data?.map((data) => {
          return <Card {...data} key={data.id} />;
        })}
      </div>
    </div>
  );
};
