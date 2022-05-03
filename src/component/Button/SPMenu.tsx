// eslint-disable-line
import { Menu, Transition } from "@headlessui/react";
import { LoginIcon, LogoutIcon } from "@heroicons/react/outline";
import {
  CogIcon,
  HomeIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { Fragment } from "react";
import { useUser } from "src/hook/useUser";

const data = [
  { href: "/", text: "ホーム", icon: <HomeIcon className="w-5 h-5" /> },
  {
    href: "/vendor/ticket/list",
    text: "チケット一覧",
    icon: <ViewGridIcon className="w-5 h-5" />,
  },
  {
    href: "",
    text: "購入履歴",
    icon: <ShoppingCartIcon className="w-5 h-5" />,
  },
  { href: "", text: "設定", icon: <CogIcon className="w-5 h-5" /> },
];
export const SPMenu: VFC = () => {
  const { user } = useUser();
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
          <Menu.Items className="absolute right-5 p-5 mt-2 w-[80%] max-w-[480px] bg-white rounded-md divide-y focus:outline-none ring-1 ring-black shadow-lg origin-top-right">
            <div className="p-1">
              {user && (
                <div className="flex items-center mb-3 space-x-3">
                  <div className="py-2 px-3 text-sm bg-red-300 rounded-lg">
                    ログイン中
                  </div>
                  <div>{user.uid}</div>{" "}
                </div>
              )}
              {data.map(({ text, href, icon }) => {
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
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm space-x-2`}
                          >
                            {icon}
                            <div>{text}</div>
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
                <div>
                  <Menu.Item>
                    {({ active }) => {
                      return (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? "bg-violet-500 text-white" : "text-blue"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm space-x-2`}
                        >
                          <LogoutIcon className="w-5 h-5" />
                          <div>ログアウト</div>
                        </button>
                      );
                    }}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => {
                      return (
                        <Link href={"/auth/delete"}>
                          <a
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-red-500"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm `}
                          >
                            退会
                          </a>
                        </Link>
                      );
                    }}
                  </Menu.Item>
                </div>
              ) : (
                <Menu.Item>
                  {({ active }) => {
                    return (
                      <button
                        onClick={handleLogin}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm space-x-2`}
                      >
                        <LoginIcon className="w-5 h-5" />
                        <div>ログイン</div>
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
