import Link from "next/link";
import type { VFC } from "react";
import { NavLink } from "src/component/Button";

export const items = [
  { href: "/", label: "チケット一覧" },
  { href: "#", label: "プライバシーポリシー" },
  { href: "#", label: "利用規約" },
];

/**
 * @package
 */
export const Header: VFC = () => {
  return (
    <header className="fixed inset-x-0 top-6 z-30 pb-1 min-w-[256px] md:flex md:justify-between md:items-center">
      <div className="flex justify-between items-center h-[60px] ">
        <Link href={"/"}>
          <a className="flex items-center pl-2">
            <h1 className="text-2xl font-bold tracking-[-0.1em]">
              チケットマーケット
            </h1>
          </a>
        </Link>
      </div>

      <nav className="whitespace-nowrap md:border-none">
        {items.map(({ href, label }) => {
          return (
            <NavLink key={href} href={href} activeClassName="text-red-500">
              <a className="inline-block py-2 px-4 hover:bg-blue">{label}</a>
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
};
