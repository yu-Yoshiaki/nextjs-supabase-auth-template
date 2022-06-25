import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { app } from "src/lib/firebase";
import { ticketConverter } from "src/lib/firebase/converter";
import type { ReadTicket } from "src/type/ticket";
import useSWR from "swr";

import { Address } from "./Address";
import { Attention } from "./Attention";
import { Checkout } from "./Checkout";
import { DateTime } from "./DateTime";
import { Description } from "./Description";
import { Organizer } from "./Organizer";
import { TicketName } from "./TicketName";

const firestore = getFirestore(app);

const fetchDocument = async (id: string) => {
  const docRef = doc(firestore, "ticket", id).withConverter(ticketConverter);
  const document = await getDoc(docRef);
  const data = JSON.parse(JSON.stringify(document.data()));
  return data;
};

export const TicketDetail = (props: { data: ReadTicket }) => {
  const router = useRouter();
  const { id } = router.query;

  const { data: ticket } = useSWR<ReadTicket>(id as string, fetchDocument, {
    fallbackData: props.data,
  });

  return (
    <div className="py-6 tracking-wide leading-relaxed">
      {ticket && (
        <div className="px-4 mx-auto space-y-4 md:px-0 md:w-[80%]">
          <div className="relative h-[300px] rounded-lg shadow-lg md:w-full md:h-[500px]">
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
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              <TicketName name={ticket.name} />
              <DateTime startDay={ticket.metadata.startDay} />
              <Description description={ticket.description} />{" "}
              {ticket.metadata.location && <Address data={ticket.metadata} />}
              <Organizer />
            </div>
            <div>
              <Checkout />
              {/* <Loading /> */}
              <Attention />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
