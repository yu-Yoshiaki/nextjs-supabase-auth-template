import Link from "next/link";
import { memo } from "react";
import { DontPurchaseAlert, SmartPhoneMenu } from "src/component";

export const items = [{ href: "/", label: "チケット一覧" }];

/**
 * @package
 */

// eslint-disable-next-line react/display-name
export const HeaderSP = memo(() => {
  return (
    <div className="fixed top-0 z-30 w-full text-center bg-white">
      <DontPurchaseAlert />
      <header className="flex justify-between items-center px-2 pb-1 min-w-[256px]">
        <div className="flex justify-between items-center h-[40px]">
          <Link href={"/"}>
            <a className="flex items-center">
              <h1 className="text-2xl font-bold tracking-[-0.1em]">
                チケットマーケット
              </h1>
            </a>
          </Link>
        </div>

        <SmartPhoneMenu />
      </header>
    </div>
  );
});
