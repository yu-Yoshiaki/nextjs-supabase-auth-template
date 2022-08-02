import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "src/component";
import { useUserSession } from "src/hook/useUserSession";

import { Signin } from "../component/Signin";

const Auth: CustomNextPage = () => {
  const { session } = useUserSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [router, session]);

  if (session) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center py-20">
      <Signin />
    </div>
  );
};

Auth.getLayout = Layout;

export default Auth;
