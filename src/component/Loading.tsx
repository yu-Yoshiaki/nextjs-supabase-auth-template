import type { VFC } from "react";

type Loading = {
  text?: string;
};

export const Loading: VFC<Loading> = (props) => {
  return (
    <div className="flex fixed inset-0 z-10 justify-center items-center bg-black opacity-50">
      <p className="text-2xl text-white">{props.text ?? "Loading..."}</p>
    </div>
  );
};
