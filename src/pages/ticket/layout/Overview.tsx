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
    <div>
      <h1 className="py-10 text-3xl font-extrabold text-left md:text-4xl">
        {props.name}
      </h1>
      <DateTime startDay={props.startDay} />
      <p className=" p-10 mt-5 w-full min-h-[120px] text-2xl md:p-20">
        {props.description}
      </p>
    </div>
  );
};
