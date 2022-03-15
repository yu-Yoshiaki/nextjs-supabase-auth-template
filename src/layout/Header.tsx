import Link from "next/link";
import type { VFC } from "react";
import { NavLink } from "src/component/Button";
import { ProfileSP } from "src/layout/ProfileSP";

const items = [{ href: "/", label: "チケット一覧" }];

/**
 * @package
 */
export const Header: VFC = () => {
  return (
    <header className="fixed top-6 right-0 left-0 z-30 min-w-[256px] bg-gray-200 border-b border-gray-200 md:grid md:static md:grid-rows-[auto,1fr,100px] md:h-full">
      <div className="flex justify-between items-center border-b border-gray-200">
        <Link href={"/"}>
          <a className="flex items-center pl-2">
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
              <a className="inline-block py-2 px-4 hover:bg-blue-300 md:block">{label}</a>
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
};
