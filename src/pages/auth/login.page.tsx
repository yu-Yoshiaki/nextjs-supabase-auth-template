import type { CustomNextPage } from "next";
import Link from "next/link";
import { FixedLayout } from "src/layout";

import { AuthForm } from "./layout/AuthForm";

const Login: CustomNextPage = () => {
  return (
    <div>
      <AuthForm createNew={false} />
      <Link href="/auth/signup">
        <a className="text-blue-600">ユーザー作成がまだの方</a>
      </Link>
    </div>
  );
};

Login.getLayout = FixedLayout;

export default Login;
