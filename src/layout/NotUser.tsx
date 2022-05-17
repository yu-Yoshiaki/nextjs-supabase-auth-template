import Link from "next/link";
import type { VFC } from "react";

const items = [
  { href: "/login", text: "ログイン", hasCreated: true },
  { href: "/signup", text: "ユーザー登録", hasCreated: false },
];
export const NotUser: VFC = () => {
  return (
    <div className="text-center">
      <h2>こちらは会員限定の機能になります。</h2>
      {items.map(({ href, text, hasCreated }) => {
        return (
          <div className="h-auto" key={href}>
            {!hasCreated && <p>※ ユーザー作成がまだの方</p>}
            <Link href={`/customer/auth${href}`} key={href}>
              <a
                className={`inline-block py-4 w-32 justify-center rounded-lg flex  mx-auto ${
                  hasCreated ? "bg-blue text-white" : "bg-green-300"
                }`}
              >
                {text}
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
