import axios from "axios";
import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useUserSession } from "src/hook/useUserSession";
import { supabase } from "src/lib/supabase";

export const Delete: CustomNextPage = () => {
  const { session } = useUserSession();
  const router = useRouter();

  const handleUserDelete = async () => {
    if (session) {
      const user = supabase.auth.user();
      if (!user) {
        alert("error");
        return;
      }

      const res = await axios.get(`/api/${user.id}/delete`);
      const data = await res.data;
      alert(data);
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleUserDelete}
      className="py-1 px-2 text-white bg-red-400 rounded-md"
    >
      退会する
    </button>
  );
};
