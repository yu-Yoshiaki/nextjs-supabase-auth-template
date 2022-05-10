import axios from "axios";
import type { VFC } from "react";
import { useUser } from "src/hook/useUser";
import useSWR from "swr";

const fetchHistory: (url: string) => Promise<any> = async (url) => {
  const res = await axios.get(url);
  const data = await res.data;
  return data;
};

export const IsLogin: VFC = () => {
  const { user } = useUser();

  const { data: list, error } = useSWR<string[]>(
    `/api/fb/history/${user?.email}/read`,
    fetchHistory,
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  if (!list && !error) return <div>Loding...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="space-y-5">
      <h2 className="text-xl text-center">購入履歴</h2>
      <ul className="px-3 w-full border-t">
        {list?.map((data) => {
          return (
            <div className="py-4 px-1 border-b" key={data}>
              <h3 className="text-xl truncate">{data}</h3>
              <p className="text-lg truncate">{""}</p>
              <div className="space-x-2">
                <button className="text-sm text-blue">編集する</button>
                <button className="text-sm text-blue">削除する</button>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
