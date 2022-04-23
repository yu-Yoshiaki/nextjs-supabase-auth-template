import Image from "next/image";
import Link from "next/link";
import type { VFC } from "react";
import type { ReadTicket } from "src/type/ticket";

export const CardLayout: VFC<{ ticket: ReadTicket; index: number }> = (
  props
) => {
  return (
    <div
      className={`group relative shadow-lg ${
        props.index === 0
          ? "col-span-2 h-[380px] mx-5 md:col-span-1 md:mx-0 md:h-[400px] md:w-[420px]"
          : "min-h-[250px] md:h-[400px] md:w-[420px]"
      }`}
    >
      <div className="w-full rounded-md group-hover:opacity-75 ">
        <Link href={`/ticket/${props.ticket.id}`}>
          <a>
            <div className={`${props.index === 0 && "p-2 md:p-0"} relative`}>
              <Image
                src={props.ticket.images[0] ?? "/mobile.jpg"}
                alt={""}
                width={420}
                height={300}
                className="block object-cover object-center"
              />
            </div>
            <p
              className={`absolute text-lg px-2 rounded-sm ${
                props.index === 0
                  ? "top-3 left-3 bg-pink"
                  : "top-1 left-1 bg-accent"
              }`}
            >
              {props.index === 0
                ? "締切間近"
                : props.ticket.metadata.startDay ?? undefined}
            </p>
            <div className="flex flex-col p-[10px] space-y-1">
              <h2 className="text-lg font-bold">{props.ticket.name}</h2>
              <p className="px-1 text-sm truncate md:text-lg md:text-ellipsis">
                {props.ticket.description}
              </p>
              {/* <p className="px-1 text-xl text-right ">
                pay {props.ticket.}~
              </p> */}
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};
