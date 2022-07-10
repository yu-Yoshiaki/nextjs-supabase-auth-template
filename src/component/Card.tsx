import { LocationMarkerIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import type { Data } from "src/pages/index.page";

export const Card = (props: Data) => {
  const metadata = props.metadata as {
    startDay: string;
    startTime: string;
    location: string;
  };

  return (
    <div className="p-4 bg-white rounded-xl border-2 border-gray-200 md:h-[300px] lg:w-[750px]">
      <div className="grid gap-2 md:grid-cols-2">
        <div className="relative h-[200px] md:w-[calc(100%-30px)] md:h-[260px]">
          <Image
            src={props.image ?? "/mobile.jpg"}
            alt={""}
            objectFit={"cover"}
            layout={"fill"}
            className="rounded-xl"
          />
        </div>

        <div className="relative space-y-2">
          <h2 className="px-[10px] text-lg font-bold">{props.name}</h2>

          <div className="py-2 px-4 space-y-2 text-sm bg-gray-200 rounded-lg">
            <div className="flex space-x-2">
              <p className="font-bold ">開催日</p>
              <p>{metadata.startDay}</p>
            </div>
            <div className="flex space-x-2">
              <p className="font-bold">開催時間</p>
              <p>{metadata.startTime}</p>
            </div>
          </div>

          <div className="flex items-center mt-2 space-x-1 text-xs">
            <LocationMarkerIcon height={20} width={20} />
            <p>{metadata.location}</p>
          </div>

          <div className="flex bottom-0 justify-between items-center pr-4 mt-6 w-full h-10 md:absolute">
            <p className=" text-2xl font-bold">
              {props.prices[0].unit_amount?.toLocaleString()}円〜
            </p>
            <Link href={`/ticket/${props.id}`} passHref>
              <a className="py-2 px-4 text-white bg-blue-300 hover:bg-blue-200 rounded-full">
                詳細を確認
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
