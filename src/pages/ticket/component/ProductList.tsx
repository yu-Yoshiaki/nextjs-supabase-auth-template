import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import type { VFC } from "react";
import { Card } from "src/component";
import { app } from "src/lib/firebase";
import { ticketConverter } from "src/lib/firebase/converter";
import type { ReadTicket } from "src/type/ticket";
import useSWR from "swr";

const firestore = getFirestore(app);

const fetchProducts = async (url: string) => {
  const collectionRef = collection(firestore, url).withConverter(
    ticketConverter
  );
  const q = query(collectionRef, where("active", "==", true));
  const docDatas = await getDocs(q);
  const data = docDatas.docs.map((d) => {
    return d.data();
  });
  const posts = JSON.parse(JSON.stringify(data));
  return posts;
};

export const ProductList: VFC = () => {
  const { data: ticketList } = useSWR<ReadTicket[]>("ticket", fetchProducts);

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-10 place-content-around place-items-center px-2 mt-6 lg:grid-cols-3">
      {ticketList &&
        ticketList.map((ticket, index) => {
          return (
            <div
              key={ticket.id}
              className={`relative shadow-lg rounded-xl md:h-[400px] md:col-span-1 md:max-w-[400px] ${
                index === 0 ? "col-span-2 mx-5 md:mx-0 h-[380px]" : "h-[250px]"
              }`}
            >
              <Card href={`/ticket/${ticket.id}`}>
                <div>
                  <div className="rounded-xl">
                    <Image
                      src={ticket.images[0] ?? "/mobile.jpg"}
                      alt={"product image"}
                      width={4}
                      height={3}
                      layout={"responsive"}
                      className="rounded-t-xl"
                    />
                  </div>
                  <p
                    className={`absolute px-2 rounded-lg top-2 left-2 ${
                      index === 0 ? "bg-pink" : "bg-accent"
                    }`}
                  >
                    {index === 0
                      ? "締切間近"
                      : ticket.metadata.startDay ?? undefined}
                  </p>
                  <div className="flex flex-col p-[10px] space-y-1">
                    <h2
                      className={`font-bold md:text-xl ${
                        index === 0 ? "text-lg " : "text-sm "
                      }`}
                    >
                      {ticket.name}
                    </h2>
                    {/* <p className="px-1 text-sm truncate md:text-lg md:text-ellipsis">
                      {ticket.description}
                    </p> */}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
    </div>
  );
};
