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
    <div className="grid grid-cols-2 gap-x-2 gap-y-10 px-2 mt-6 lg:grid-cols-3 xl:gap-x-8">
      {ticketList &&
        ticketList.map((ticket, index) => {
          return (
            <div
              key={ticket.id}
              className={`group relative shadow-lg rounded-xl ${
                index === 0
                  ? "col-span-2 h-[380px] mx-5 md:col-span-1 md:mx-0 md:h-[400px] "
                  : "min-h-[250px] md:h-[400px] "
              }`}
            >
              <Card href={`/ticket/${ticket.id}`}>
                <div>
                  <div
                    className={`${
                      index === 0 && "relative p-2 h-[240px] md:p-0"
                    } w-full rounded-xl`}
                  >
                    <Image
                      src={ticket.images[0] ?? "/mobile.jpg"}
                      alt={""}
                      width={1000}
                      height={800}
                      layout={index === 0 ? "fill" : "responsive"}
                      className="block object-cover object-center rounded-t-xl"
                    />
                  </div>
                  <p
                    className={`absolute text-lg px-2 rounded-xl ${
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
                    <h2
                      className={`font-bold ${
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
