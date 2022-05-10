import type { CustomNextPage } from "next";
import Link from "next/link";
import { useUser } from "src/hook/useUser";
import { Layout } from "src/layout";

import { IsLogin } from "./IsLogin";

const History: CustomNextPage = () => {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <IsLogin />
      ) : (
        <div>
          <h2>こちらは会員限定の機能になります。</h2>
          <Link href={"/auth/login"}>
            <a>ログイン</a>
          </Link>
          <p>※ ユーザー作成がまだの方</p>
          <Link href={"/auth/signup"}>
            <a>ユーザー登録</a>
          </Link>
        </div>
      )}
    </div>
  );
};

History.getLayout = Layout;
export default History;
