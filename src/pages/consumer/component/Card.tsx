import { LocationMarkerIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import type { ReadTicket } from "src/type/ticket";

export const Card = (props: ReadTicket) => {
  return (
    <div className="p-4 bg-white rounded-xl border-2 border-gray-200 md:h-[300px] lg:w-[750px]">
      <a className="grid md:grid-cols-2">
        <div className="relative h-[calc(300px-40px)] md:w-[calc(100%-30px)]">
          <Image
            src={props.images[0] ?? "/mobile.jpg"}
            alt={""}
            objectFit={"cover"}
            layout={"fill"}
            className="rounded-xl"
          />
        </div>

        <div className="relative space-y-2">
          <h2 className="p-[10px] text-sm font-bold md:text-lg">
            {props.name}
          </h2>

          <div className="py-2 px-4 space-y-2 text-sm bg-gray-200 rounded-lg">
            <div className="flex space-x-2">
              <p className="font-bold ">開催日</p>
              <p>{props.metadata.startDay}</p>
            </div>
            <div className="flex space-x-2">
              <p className="font-bold">開催時間</p>
              <p>{props.metadata.startTime}</p>
            </div>
          </div>

          <div className="flex items-center mt-2 space-x-1 text-xs">
            <LocationMarkerIcon height={20} width={20} />
            <p>{props.metadata.location}</p>
          </div>

          <div className="flex bottom-0 justify-between items-center pr-4 mt-6 w-full h-10 md:absolute">
            <p className=" text-2xl font-bold">
              {/* {"10000".toLocaleString()}円〜 */}
            </p>
            <Link href={`/consumer/ticket/${props.id}`} passHref>
              <a className="py-2 px-4 text-white bg-blue-300 hover:bg-blue-200 rounded-full">
                詳細を確認
              </a>
            </Link>
          </div>
        </div>
      </a>
    </div>
  );
};
