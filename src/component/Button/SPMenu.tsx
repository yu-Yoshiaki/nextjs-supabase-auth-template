// eslint-disable-line
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { Fragment } from "react";
import { useAuth } from "src/hook/useAuth";

const data = [
  { href: "", text: "ホーム" },
  { href: "/vendor/ticket/list", text: "チケット一覧" },
  { href: "", text: "購入履歴" },
  { href: "", text: "設定" },
];
export const SPMenu: VFC = () => {
  const { user } = useAuth();
  const auth = getAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    return router.push("/");
  };

  const handleLogin = async () => {
    return router.push("/auth/login");
  };

  return (
    <div>
      <Menu as="div">
        <div>
          <Menu.Button>
            <UserCircleIcon className="w-8 h-8" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-5 mt-2 w-[80%] bg-white rounded-md divide-y focus:outline-none ring-1 ring-black shadow-lg origin-top-right">
            <div className="p-1 ">
              {user && <div>ID:{user}</div>}
              {data.map(({ text, href }) => {
                return (
                  <Menu.Item key={text}>
                    {({ active }) => {
                      return (
                        <Link href={href}>
                          <a
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            {text}
                          </a>
                        </Link>
                      );
                    }}
                  </Menu.Item>
                );
              })}
            </div>

            <div className="p-1">
              {user ? (
                <Menu.Item>
                  {({ active }) => {
                    return (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        ログアウト
                      </button>
                    );
                  }}
                </Menu.Item>
              ) : (
                <Menu.Item>
                  {({ active }) => {
                    return (
                      <button
                        onClick={handleLogin}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        ログイン
                      </button>
                    );
                  }}
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
