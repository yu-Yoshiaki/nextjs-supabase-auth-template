import type { VFC } from "react";
import type { ReadTicket } from "src/type/ticket";

import { DateTime } from "./DateTime";

type Overview = {
  name?: ReadTicket["name"];
  description?: ReadTicket["description"];
  startDay: ReadTicket["metadata"]["startDay"];
};

export const Overview: VFC<Overview> = (props) => {
  return (
    <div className="">
      <h1 className="p-10 text-3xl font-extrabold text-left bg-white rounded-md shadow-md md:text-3xl">
        {props.name}
      </h1>
      <DateTime startDay={props.startDay} />
      <p className=" p-10 mt-5 w-full min-h-[120px] text-2xl bg-white rounded-md shadow-md md:p-20">
        {props.description}
      </p>
    </div>
  );
};
