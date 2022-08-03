import { deleteUser } from "firebase/auth";
import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useUserSession } from "src/hook/useUserSession";

export const Delete: CustomNextPage = () => {
  const { user } = useUserSession();
  const router = useRouter();

  const handleUserDelete = async () => {
    if (user) {
      try {
        await deleteUser(user);
        alert("ユーザー情報を削除しました。");
        router.push("/");
      } catch (err: any) {
        alert(err.message);
      }
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
