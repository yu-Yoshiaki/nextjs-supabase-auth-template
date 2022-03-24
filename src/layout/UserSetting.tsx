import type { VFC } from "react";
import { NavLink } from "src/component/Button";

const items = [
  { href: "/auth/userProfile", label: "プロフィール変更" },
  { href: "/", label: "売買履歴" },
  { href: "/setting", label: "設定" },
];

export const UserSetting: VFC = () => {
  return (
    <div>
      <nav className="mx-auto w-[90%]">
        {items.map(({ href, label }) => {
          return (
            <NavLink key={href} href={href} activeClassName="text-red-500">
              <a className="block p-4 hover:bg-blue border-b">{label}</a>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
