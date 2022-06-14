//
// ログイン中 or NOT の判定
//
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { app } from "src/lib/firebase";

const auth = getAuth(app);

export const useUserStatus = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push("/");
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  return { user };
};
