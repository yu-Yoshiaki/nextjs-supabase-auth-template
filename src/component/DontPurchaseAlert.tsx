import { ExclamationIcon } from "@heroicons/react/solid";
import type { VFC } from "react";

export const DontPurchaseAlert: VFC = () => {
  return (
    <div className="flex justify-center items-center p-2 w-full bg-yellow-100 rounded-md md:w-[360px]">
      <ExclamationIcon className="w-6 h-6 text-yellow-500" />{" "}
      <p className="font-bold text-red-400">
        テスト版。実際には購入されません。
      </p>
    </div>
  );
};
