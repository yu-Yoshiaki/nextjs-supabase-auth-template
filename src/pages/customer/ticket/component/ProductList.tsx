import Image from "next/image";
import Link from "next/link";
import type { VFC } from "react";
import { fetchCollection } from "src/lib/fetchCollection";
import type { ReadTicket } from "src/type/ticket";
import useSWR from "swr";

// const TopCard: VFC<{ ticket: ReadTicket }> = (props) => {
//   return (
//     <div
//       key={props.ticket.id}
//       className="relative shadow-lg rounded-xl h-full md:col-span-1 md:max-w-[400px] bg-blue col-span-2 mx-5 md:mx-0"
//     >
//       <Link href={`/customer/ticket/${props.ticket.id}`}>
//         <a>
//           <div className="rounded-xl">
//             <Image
//               src={props.ticket.images[0] ?? "/mobile.jpg"}
//               alt={"product image"}
//               width={4}
//               height={3}
//               layout={"responsive"}
//               className="rounded-t-xl"
//             />
//           </div>
//           <p className="absolute px-2 rounded-lg top-2 left-2 bg-pink">
//             締切間近
//           </p>
//           <div className="flex flex-col p-[10px] space-y-1">
//             <h2 className="font-bold md:text-xl text-lg">
//               {props.ticket.name}
//             </h2>
//           </div>
//         </a>
//       </Link>
//     </div>
//   );
// };

const Card: VFC<{ ticket: ReadTicket }> = (props) => {
  return (
    <div
      key={props.ticket.id}
      className="w-[350px] rounded-xl shadow-lg md:col-span-1 lg:h-[400px]"
    >
      <Link href={`/customer/ticket/${props.ticket.id}`}>
        <a className="inline-block relative w-[350px] h-[250px]">
          <Image
            src={props.ticket.images[0] ?? "/mobile.jpg"}
            alt={"product image"}
            objectFit={"cover"}
            layout={"fill"}
            className="top-0 rounded-t-xl"
          />

          <p className="absolute top-2 left-2 px-2 rounded-lg">
            {props.ticket.metadata.startDay ?? undefined}
          </p>

          <h2 className="p-[10px] mt-[300px] text-sm font-bold md:text-xl">
            {props.ticket.name}
          </h2>
        </a>
      </Link>
    </div>
  );
};

export const ProductList: VFC = () => {
  //　SWRConfigで、共通処理になっている。
  const { data: ticketList } = useSWR<ReadTicket[]>("ticket", fetchCollection);

  return (
    <div className="grid grid-cols-2 gap-y-10 justify-items-center px-2 mt-6 lg:grid-cols-3">
      {ticketList?.map((ticket) => {
        return <Card ticket={ticket} key={ticket.id} />;
      })}
    </div>
  );
};
