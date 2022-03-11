import Link from "next/link";
import type { VFC } from "react";
import { NavLink } from "src/component/Button";
import { ProfileSP } from "src/layout/ProfileSP";

const items = [
  { href: "/", label: "チケット一覧" },
];

/**
 * @package
 */
export const Header: VFC = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-30 px-2 min-w-[256px] md:grid md:static md:grid-rows-[auto,1fr,100px] md:h-auto">
      <div className="flex justify-between items-center w-full ">
        <Link href={"/"}>
          <a className="flex items-center">
            <h1 className="text-2xl font-bold md:text-6xl ">
              TICKET<span className="text-red-400">tia</span>
            </h1>
          </a>
        </Link>

        <ProfileSP />
      </div>

      <nav>
        {items.map(({ href, label }) => {
          return (
            <NavLink key={href} href={href} activeClassName="text-red-500">
              <a className="inline-block p-4 hover:bg-blue-300 md:block">{label}</a>
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
};
