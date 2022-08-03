import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "src/component";
import { useUserSession } from "src/hook/useUserSession";

import { Signup } from "../component/Signup";

const Auth: CustomNextPage = () => {
  const { user } = useUserSession();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [router, user]);

  if (user) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center py-20">
      <Signup />
    </div>
  );
};

Auth.getLayout = Layout;

export default Auth;
