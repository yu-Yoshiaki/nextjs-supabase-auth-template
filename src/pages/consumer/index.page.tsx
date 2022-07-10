import type { CustomNextPage } from "next";
import { useUserSession } from "src/hook/useUserSession";
import { Layout } from "src/layout";

import { Profile } from "./component/Profile";
import { Signin } from "./component/Signin";

const Auth: CustomNextPage = () => {
  const { session } = useUserSession();

  return <div>{session ? <Profile session={session} /> : <Signin />}</div>;
};

Auth.getLayout = Layout;

export default Auth;
