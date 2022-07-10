import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "src/lib/supabase";

export const useUserSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return { session };
};
