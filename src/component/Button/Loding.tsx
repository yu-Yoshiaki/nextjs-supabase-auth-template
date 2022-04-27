import type { VFC } from "react";

export const Loding: VFC = () => {
  return (
    <div className="flex fixed inset-0 z-10 justify-center items-center bg-black opacity-50">
      <p className="text-2xl text-white">Loding...</p>
    </div>
  );
};
