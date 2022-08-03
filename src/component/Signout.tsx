/**
 * @package
 */

import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "src/lib/firebase";

export const Signout = () => {
  const router = useRouter();
  const handleSignout = async () => {
    await signOut(auth);
    router.push("/");
  };
  return (
    <button onClick={handleSignout} className="hover:text-blue-200">
      サインアウト
    </button>
  );
};
