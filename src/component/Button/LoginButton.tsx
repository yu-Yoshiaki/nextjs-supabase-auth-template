import Link from "next/link";
import { SmartPhoneMenu } from "src/component";
import { useUserSession } from "src/hook/useUserSession";

export const LoginButton = () => {
  const { session } = useUserSession();

  return (
    <div className="flex items-center">
      {session ? (
        <SmartPhoneMenu />
      ) : (
        <Link href={"/consumer"} passHref>
          <a className="py-2 px-4 text-sm text-white bg-blue-300 hover:bg-blue-200 rounded-full">
            ログイン / 新規作成
          </a>
        </Link>
      )}
    </div>
  );
};
