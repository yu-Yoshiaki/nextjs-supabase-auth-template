import Link from "next/link";
import type { VFC } from "react";
import { SPMenu } from "src/component/Button";

export const items = [
  { href: "/", label: "チケット一覧" },
  // { href: "#", label: "プライバシーポリシー" },
  // { href: "#", label: "利用規約" },
];

/**
 * @package
 */
export const HeaderSP: VFC = () => {
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

      <SPMenu />
    </header>
  );
};
