import { ExclamationIcon } from "@heroicons/react/solid";
import type { VFC } from "react";

export const DontPurchaseAlert: VFC = () => {
  return (
    <div className="flex fixed inset-x-1/2 z-30 justify-center items-center p-2 ml-[-180px] w-[360px] bg-yellow-100 rounded-md">
      <ExclamationIcon className="w-6 h-6 text-yellow-500" />{" "}
      <p className="font-bold text-red-400">
        テスト版。実際には購入されません。
      </p>
    </div>
  );
};
