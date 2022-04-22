import Image from "next/image";
import type { VFC } from "react";
import { Checkout } from "src/pages/ticket/layout/Checkout";
import type { ReadPrice, ReadTicket } from "src/type/ticket";

import { Address } from "./Address";

const DateAndTime = () => {
  return (
    <div className="py-5 px-2 space-y-2 bg-gray">
      <div className="flex space-x-2">
        <p className="font-bold">開催日</p>
        <p>8/20</p>
      </div>
      <div className="flex space-x-2">
        <p className="font-bold">開催時間</p>
        <p>20:00~</p>
      </div>
    </div>
  );
};

const Overview: VFC<{
  name: ReadTicket["name"];
  description: ReadTicket["description"];
}> = (props) => {
  return (
    <div>
      <h1 className="py-5 text-4xl font-extrabold text-left">{props.name}</h1>
      <DateAndTime />
      <p className=" p-10 mt-5 w-full min-h-[120px] text-lg border border-gray md:p-20">
        {props.description}
      </p>
    </div>
  );
};

const Organizer = () => {
  const data = {
    name: "TICKETIA",
    tel: "090-1234-5678",
    address: "東京都渋谷区道玄坂1−234−5",
  };

  return (
    <div className="py-10 px-4 border border-gray">
      <div className="flex justify-center items-center space-x-5 w-full">
        <Image
          width={120}
          height={120}
          src={"/noimage.jpg"}
          alt={"test"}
          className="rounded-full"
        />

        <div>
          <p className="text-xl font-bold text-left">{data.name}</p>
          <p className="text-left">{data.tel}</p>
          <p className="text-left">{data.address}</p>
        </div>
      </div>
    </div>
  );
};

export const DetailPageLayout: VFC<{
  ticket: ReadTicket;
  test: boolean;
  prices?: ReadPrice[];
}> = (props) => {
  return (
    <div className="pb-4 tracking-wide leading-relaxed">
      <div className="pt-6 text-center">
        <Image
          width={800}
          height={480}
          src={props.ticket.images[0] ?? "/noimage.jpg"}
          alt={props.ticket.images[0] ? props.ticket.name : "not image data"}
          className="object-cover object-center w-full h-full"
        />

        {/* Product info */}
        <div className="px-4 pb-16 mx-auto space-y-10 max-w-2xl sm:px-6 ">
          <Overview
            name={props.ticket.name}
            description={props.ticket.description}
          />

          {props.prices && (
            <Checkout
              name={props.ticket.name}
              amount={props.prices[0].unitAmount}
              priceId={props.prices[0].id}
            />
          )}

          {props.ticket.metadata.address && (
            <Address data={props.ticket.metadata} />
          )}
          <Organizer />
        </div>
      </div>
    </div>
  );
};
