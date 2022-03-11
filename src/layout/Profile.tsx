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

export const Profile: VFC = () => {
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
    <div className="hidden md:block">
      <div className="p-4">
        <div className="h-full text-center sm:flex-row sm:justify-start sm:text-left">
          <div className="flex justify-between">
            <Image
              width={80}
              height={80}
              alt="team"
              className="object-cover object-center flex-shrink-0 mb-4 rounded-full sm:mb-0"
              src="/bread.jpg"
            />
            {userID && <p className="flex items-center p-1 font-bold text-blue-500 rounded-md">ログイン中</p>}
          </div>

          <div className="flex-grow sm:pl-8">
            <h2 className="text-lg font-medium text-gray-900 ">
              {userInfomation ? userInfomation.name : "No User Name"}
            </h2>
            <p className="mb-4">{userInfomation?.profile}</p>
            <span className="inline-flex">
              <a className="text-gray-500">
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
              <a className="ml-2 text-gray-500">
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
              <a className="ml-2 text-gray-500">
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
        </div>
      </div>

      <UserSetting />
      {user && (
        <button className="flex justify-center py-5 mx-auto mb-5 text-blue-500" onClick={handleLogout}>
          ログアウト
        </button>
      )}
    </div>
  );
};