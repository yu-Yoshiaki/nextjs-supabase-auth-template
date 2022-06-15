import Image from "next/image";
import { useRouter } from "next/router";
import type { VFC } from "react";
import type { ReadTicket } from "src/type/ticket";
import useSWR from "swr";

import { Address } from "./Address";
import { Checkout } from "./Checkout";
import { DateTime } from "./DateTime";
import { Description } from "./Description";
import { Organizer } from "./Organizer";
import { TicketName } from "./TicketName";

export const DetailPageLayout: VFC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: ticket } = useSWR<ReadTicket>(id as string);

  return (
    <div className="py-6 tracking-wide leading-relaxed ">
      {ticket && (
        <div className="px-4 mx-auto space-y-4 md:px-0 md:w-[700px]">
          <div className="relative h-[210px] rounded-lg shadow-lg md:w-[700px] md:h-[400px]">
            <Image
              width={800}
              height={600}
              src={ticket.images[0] ?? "/noimage.jpg"}
              alt={ticket.images[0] ? ticket.name : "not image data"}
              className="object-cover object-center w-full h-full rounded-lg"
              layout={"fill"}
              objectFit={"cover"}
            />
          </div>
          <TicketName name={ticket.name} />
          <DateTime startDay={ticket.metadata.startDay} />
          <Description description={ticket.description} />
          <Checkout />
          {ticket.metadata.address && <Address data={ticket.metadata} />}
          <Organizer />
        </div>
      )}
    </div>
  );
};
