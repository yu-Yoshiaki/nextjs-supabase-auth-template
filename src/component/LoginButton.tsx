import Link from "next/link";
import type { VFC } from "react";
import { useUser } from "src/hook/useUser";

export const LoginButton: VFC = () => {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <div className="flex items-center space-x-2">
          <p className="py-1 px-2 bg-pink rounded-md">ログイン中</p>
          <p>ID: {user.uid}</p>
        </div>
      ) : (
        <Link href={"/auth/login"}>
          <a>ログイン</a>
        </Link>
      )}
    </div>
  );
};
