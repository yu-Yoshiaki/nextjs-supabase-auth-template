// eslint-disable-line
import { Popover, Transition } from "@headlessui/react";
import { LoginIcon, LogoutIcon } from "@heroicons/react/outline";
import {
  CogIcon,
  HomeIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { Fragment } from "react";
import { useUserStatus } from "src/hook/useUserStatus";

const data = [
  { href: "/", text: "ホーム", icon: <HomeIcon className="w-5 h-5" /> },
  {
    href: "/customer/history",
    text: "購入履歴",
    icon: <ShoppingCartIcon className="w-5 h-5" />,
  },
  { href: "", text: "設定", icon: <CogIcon className="w-5 h-5" /> },
];

type Button = {
  text: string;
  href: string;
  icon?: JSX.Element;
  className: string;
  clickFunction?: "login" | "logout" | "move";
};

export const SPMenu: VFC = () => {
  const { user } = useUserStatus();
  const auth = getAuth();
  const router = useRouter();

  const Button = (props: Button) => {
    const handleClick = async () => {
      switch (props.clickFunction) {
        case "logout": {
          await auth.signOut();
          return router.push("/");
        }
        case "login": {
          return router.push("/customer/auth/login");
        }
        case "move": {
          return router.push(props.href);
        }
      }
    };

    return (
      <button
        key={props.text}
        onClick={handleClick}
        className={props.className}
      >
        {props.icon}
        {props.text}
      </button>
    );
  };

  return (
    <Popover>
      <div>
        <Popover.Button className="focus:outline-none">
          <UserCircleIcon className="w-8 h-8" aria-hidden="true" />
        </Popover.Button>
        <div>
          <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute right-5 p-5 mt-2 w-[80%] max-w-[480px] bg-white rounded-md divide-y focus:outline-none shadow-lg origin-top-right">
              <div>
                <div className="p-1">
                  {user && (
                    <div className="flex items-center mb-3 space-x-3">
                      <p className="py-2 px-3 text-sm whitespace-nowrap bg-red-300 rounded-lg">
                        ログイン中
                      </p>
                      <p className="overflow-hidden">{user.uid}</p>
                    </div>
                  )}
                  {data.map(({ text, href, icon }) => {
                    return (
                      <Button
                        key={text}
                        href={href}
                        text={text}
                        icon={icon}
                        clickFunction={"move"}
                        className={`text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm space-x-2`}
                      />
                    );
                  })}
                </div>

                <div className="p-1">
                  {user ? (
                    <div>
                      <Button
                        href={"/"}
                        text={"ログアウト"}
                        icon={<LogoutIcon className="w-5 h-5" />}
                        clickFunction={"logout"}
                        className={
                          "group flex items-center p-2 space-x-2 w-full text-sm text-blue rounded-md"
                        }
                      />

                      <Button
                        href={"/customer/auth/delete"}
                        text={"退会"}
                        clickFunction={"move"}
                        className={
                          "group flex items-center p-2 w-full text-sm text-red-500 rounded-md"
                        }
                      />
                    </div>
                  ) : (
                    <Button
                      href={"/"}
                      text={"ログイン"}
                      icon={<LoginIcon className="w-5 h-5" />}
                      clickFunction={"login"}
                      className={
                        "group flex items-center p-2 space-x-2 w-full text-sm text-blue rounded-md"
                      }
                    />
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      </div>
    </Popover>
  );
};
