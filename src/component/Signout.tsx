/**
 * @package
 */

import { supabase } from "src/lib/supabase";

export const Signout = () => {
  const handleSignout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <button onClick={handleSignout} className="hover:text-blue-200">
      サインアウト
    </button>
  );
};
