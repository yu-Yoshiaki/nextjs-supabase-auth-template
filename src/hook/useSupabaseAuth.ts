import type { User } from "@supabase/supabase-js";
import { useCallback, useState } from "react";
import { supabase } from "src/lib/supabase";

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const signin = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) return window.alert(error.message);
      setUser(user);
      return;
    },
    []
  );

  const signup = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) return window.alert(error.message);
      setUser(user);
      return;
    },
    []
  );

  const signout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) return window.alert(error.message);
  }, []);

  return { user, signin, signout, signup };
};
