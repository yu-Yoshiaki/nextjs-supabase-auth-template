import Image from "next/image";
import type { VFC } from "react";
import type { ReadTicket } from "src/type/ticket";

import { Address } from "./Address";
import { Checkout } from "./Checkout";
import { Organizer } from "./Organizer";
import { Overview } from "./Overview";

type DetailPageLayout = {
  ticket: ReadTicket;
  test: boolean;
};

export const DetailPageLayout: VFC<DetailPageLayout> = (props) => {
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

          <Checkout name={props.ticket.name} id={props.ticket.id} />

          {props.ticket.metadata.address && (
            <Address data={props.ticket.metadata} />
          )}
          <Organizer />
        </div>
      </div>
    </div>
  );
};
