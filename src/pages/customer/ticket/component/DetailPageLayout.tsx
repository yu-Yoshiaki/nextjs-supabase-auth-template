import Image from "next/image";
import { useRouter } from "next/router";
import type { VFC } from "react";
import type { ReadTicket } from "src/type/ticket";
import useSWR from "swr";

import { Address } from "./Address";
import { Checkout } from "./Checkout";
import { Organizer } from "./Organizer";
import { Overview } from "./Overview";

export const DetailPageLayout: VFC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: ticket } = useSWR<ReadTicket>(id as string);

  return (
    <div className="pb-4 tracking-wide leading-relaxed bg-blue-50">
      {ticket && (
        <div className="px-4 pt-6 text-center">
          <div className="relative mx-auto w-[400px] h-[300px] md:w-[700px] md:h-[400px]">
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

          {/* Product info */}
          <div className="pb-16 mx-auto space-y-10 max-w-2xl sm:px-6 ">
            <Overview
              name={ticket.name}
              description={ticket.description}
              startDay={ticket.metadata.startDay}
            />

            <Checkout />

            {ticket.metadata.address && <Address data={ticket.metadata} />}
            <Organizer />
          </div>
        </div>
      )}
    </div>
  );
};
