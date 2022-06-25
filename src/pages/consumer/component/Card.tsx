import { LocationMarkerIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  image?: {
    src: string;
  };
  name: string;
  day?: string;
  time?: string;
  location?: string;
  price?: number;
};

export const Card = (props: Props) => {
  return (
    <div className="p-4 h-[300px] bg-white rounded-xl border-2 border-gray-200 lg:w-[750px]">
      <a className="grid grid-cols-2">
        <div className="relative w-[calc(100%-30px)] h-[calc(300px-40px)]">
          <Image
            src={"/mobile.jpg"}
            alt={""}
            objectFit={"cover"}
            layout={"fill"}
            className="rounded-xl"
          />
        </div>

        <div className="relative">
          <h2 className="p-[10px] text-sm font-bold md:text-lg">
            {props.name}
          </h2>

          <div className="py-2 px-4 space-y-2 text-sm bg-gray-200 rounded-lg">
            <div className="flex space-x-2">
              <p className="font-bold ">開催日</p>
              <p>{props.day}</p>
            </div>
            <div className="flex space-x-2">
              <p className="font-bold">開催時間</p>
              <p>{props.time}</p>
            </div>
          </div>

          <div className="flex items-center mt-2 space-x-1 text-xs">
            <LocationMarkerIcon height={20} width={20} />
            <p>{props.location}</p>
          </div>

          <div className="flex absolute bottom-0 justify-between items-center pr-4 w-full">
            <p className=" text-2xl font-bold">
              {"10000".toLocaleString()}円〜
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
