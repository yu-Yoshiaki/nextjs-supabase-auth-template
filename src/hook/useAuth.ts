//
// ログイン中 or NOT の判定
//
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "src/lib/firebase";

const auth = getAuth(app);

export const useAuth = () => {
  const [user, setUser] = useState<User["uid"] | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  return { user };
};
