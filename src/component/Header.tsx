import Link from "next/link";
import { memo } from "react";

/**
 * @package
 */

// eslint-disable-next-line react/display-name
export const Header = memo(() => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 w-full bg-white">
      <div className="mx-auto w-[80%] h-[80px] md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <a className="flex items-center pl-2">
              <h1 className="text-2xl font-bold tracking-[-0.1em]">
                チケットマーケット
              </h1>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
});
