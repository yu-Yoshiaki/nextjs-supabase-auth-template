import Image from "next/image";
import Link from "next/link";
import type { VFC } from "react";
import type { ReadTicket } from "src/type/ticket";

export const CardLayout: VFC<{ ticket: ReadTicket }> = (props) => {
  return (
    <div className="group relative min-h-[380px] border shadow-lg">
      <div className="w-full rounded-md group-hover:opacity-75 ">
        <Link href={`/ticket/${props.ticket.id}`}>
          <a>
            <Image
              src={
                "https://firebasestorage.googleapis.com/v0/b/ticketia-b34da.appspot.com/o/pexels-canva-studio-3194524.webp?alt=media&token=741b46e3-3cee-4c50-8831-32adca4cae01"
              }
              alt={""}
              width={420}
              height={300}
              className="block object-cover object-center w-full h-full"
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-col p-[10px] space-y-1">
        <h2 className="text-lg font-medium">{props.ticket.name}</h2>
        <p className="px-1">{props.ticket.description}</p>
      </div>
      <p className="px-1 text-xl text-right">pay {props.ticket.priceList.nomal.price}~</p>
    </div>
  );
};
