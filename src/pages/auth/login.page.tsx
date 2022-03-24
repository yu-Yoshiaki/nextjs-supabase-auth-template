import type { CustomNextPage } from "next";
import Link from "next/link";
import { Layout } from "src/layout";

import { AuthForm } from "./layout/AuthForm";

const Login: CustomNextPage = () => {
  return (
    <div>
      <AuthForm createNew={false} />
      <Link href="/auth/signup">
        <a className="flex justify-center items-center">ユーザー作成がまだの方</a>
      </Link>
    </div>
  );
};

Login.getLayout = Layout;

export default Login;
