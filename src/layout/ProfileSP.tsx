import { Popover, Transition } from "@headlessui/react";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import type { VFC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useUser } from "src/hook/useUser";
import { UserSetting } from "src/layout/UserSetting";
import { auth, firestore } from "src/lib/firebase";

type UserInfo = {
  name: string;
  profile: string;
  image?: string;
};

export const ProfileSP: VFC = () => {
  const { userID } = useUser();
  const [userInfomation, setUserInfo] = useState<UserInfo | undefined>();

  const { user } = useUser();
  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        return document.location.reload();
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  const FetchUserInfomation = useCallback(async () => {
    if (userID) {
      const docRef = doc(firestore, "userInfomation", userID);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        setUserInfo(docData.data() as UserInfo);
      }
    }
  }, [userID]);

  useEffect(() => {
    FetchUserInfomation();
  }, [FetchUserInfomation]);

  return (
    <Popover className="block md:hidden">
      <div className="relative p-4">
        <Popover.Button className="h-full text-center sm:flex-row sm:justify-start sm:text-left">
          <Image
            width={40}
            height={40}
            alt="team"
            className="object-cover object-center shrink-0 mb-4 rounded-full sm:mb-0"
            src="/bread.jpg"
          />
        </Popover.Button>
      </div>
      <Popover.Overlay className="fixed inset-0 bg-gray opacity-50" />

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
      >
        <Popover.Panel className="absolute inset-x-5 z-10 p-5 bg-white rounded-lg">
          <div className="grow pr-8 text-right ">
            <h2 className="text-lg font-medium">
              {userInfomation ? userInfomation.name : "No User"}
            </h2>
            <p className="mb-4">{userInfomation?.profile}</p>
            <span className="inline-flex">
              <a className="">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </a>
            </span>
          </div>
          <UserSetting />
          {user && (
            <button
              className="flex justify-center py-5 mx-auto mb-5"
              onClick={handleLogout}
            >
              ログアウト
            </button>
          )}
        </Popover.Panel>
      </Transition>
      {/* 
      {userID && <p className="flex items-center p-1 font-bold text-blue-500 rounded-md">ログイン中</p>}

      
       */}
    </Popover>
  );
};
