import Link from "next/link";
import { memo } from "react";
import { Delete } from "src/component/Delete";
import { Signout } from "src/component/Signout";
import { useUserSession } from "src/hook/useUserSession";

/**
 * @package
 */

// eslint-disable-next-line react/display-name
export const Header = memo(() => {
  const { user } = useUserSession();
  return (
    <header className="fixed inset-x-0 top-0 z-10 w-full bg-white">
      <div className="mx-auto w-[80%] h-[80px] md:flex md:justify-between md:items-center">
        <Link href={"/"}>
          <a className="flex items-center pl-2">
            <h1 className="text-2xl font-bold text-gray-600 hover:text-blue-200">
              Next.js + FirebaseAuth
            </h1>
          </a>
        </Link>

        {user ? (
          <div className="space-x-4">
            <Signout />
            <Delete />
          </div>
        ) : (
          <Link href="/signin">
            <a className="text-green-400">サインイン</a>
          </Link>
        )}
      </div>
    </header>
  );
});
