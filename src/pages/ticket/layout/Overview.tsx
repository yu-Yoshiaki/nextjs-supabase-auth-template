import type { VFC } from "react";
import type { ReadTicket } from "src/type/ticket";

import { DateTime } from "./DateTime";

type Overview = {
  name?: ReadTicket["name"];
  description?: ReadTicket["description"];
};

export const Overview: VFC<Overview> = (props) => {
  return (
    <div>
      <h1 className="py-5 text-4xl font-extrabold text-left">{props.name}</h1>
      <DateTime />
      <p className=" p-10 mt-5 w-full min-h-[120px] text-lg border border-gray md:p-20">
        {props.description}
      </p>
    </div>
  );
};
