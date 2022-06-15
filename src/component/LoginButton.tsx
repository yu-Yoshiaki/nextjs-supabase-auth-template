import Link from "next/link";
import type { VFC } from "react";
import { useUserStatus } from "src/hook/useUserStatus";

export const LoginButton: VFC = () => {
  const { user } = useUserStatus();

  return (
    <div>
      {user ? (
        <div className="flex items-center space-x-2">
          <p className="py-1 px-2 bg-red-200 rounded-md">ログイン中</p>
          <p>ID: {user.uid}</p>
        </div>
      ) : (
        <Link href={"/customer/auth/login"}>
          <a>ログイン</a>
        </Link>
      )}
    </div>
  );
};
