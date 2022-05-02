import { collection, getDocs, getFirestore } from "firebase/firestore";
import Image from "next/image";
import type { VFC } from "react";
import { Card } from "src/component";
import { app, ticketConverter } from "src/lib/firebase";
import type { ReadTicket } from "src/type/ticket";
import useSWR from "swr";

const firestore = getFirestore(app);

const fetchProducts = async (url: string) => {
  const collectionRef = collection(firestore, url).withConverter(
    ticketConverter
  );
  const docDatas = await getDocs(collectionRef);
  const data = docDatas.docs.map((d) => {
    return d.data();
  });
  const posts = JSON.parse(JSON.stringify(data));
  return posts;
};

export const ProductList: VFC = () => {
  const { data: ticketList } = useSWR<ReadTicket[]>("ticket", fetchProducts);

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-10 px-2 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {ticketList &&
        ticketList.map((ticket, index) => {
          return (
            <div
              key={ticket.id}
              className={`group relative shadow-lg ${
                index === 0
                  ? "col-span-2 h-[380px] mx-5 md:col-span-1 md:mx-0 md:h-[400px] md:w-[420px]"
                  : "min-h-[250px] md:h-[400px] md:w-[420px]"
              }`}
            >
              <Card href={`/ticket/${ticket.id}`}>
                <div>
                  <div className={`${index === 0 && "p-2 md:p-0"} relative`}>
                    <Image
                      src={ticket.images[0] ?? "/mobile.jpg"}
                      alt={""}
                      width={420}
                      height={300}
                      className="block object-cover object-center"
                    />
                  </div>
                  <p
                    className={`absolute text-lg px-2 rounded-sm ${
                      index === 0
                        ? "top-3 left-3 bg-pink"
                        : "top-1 left-1 bg-accent"
                    }`}
                  >
                    {index === 0
                      ? "締切間近"
                      : ticket.metadata.startDay ?? undefined}
                  </p>
                  <div className="flex flex-col p-[10px] space-y-1">
                    <h2 className="text-lg font-bold">{ticket.name}</h2>
                    <p className="px-1 text-sm truncate md:text-lg md:text-ellipsis">
                      {ticket.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
    </div>
  );
};
