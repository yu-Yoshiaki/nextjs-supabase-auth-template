import Link from "next/link";
import { memo } from "react";
import { SmartPhoneMenu } from "src/component";

export const items = [{ href: "/", label: "チケット一覧" }];

/**
 * @package
 */

// eslint-disable-next-line react/display-name
export const HeaderSP = memo(() => {
  return (
    <header className="flex fixed inset-x-0 top-6 z-30 justify-between items-center px-2 pb-1 min-w-[256px]">
      <div className="flex justify-between items-center h-[90px]">
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
  );
});
