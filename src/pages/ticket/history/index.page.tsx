import type { CustomNextPage } from "next";
import { useUserStatus } from "src/hook/useUserStatus";
import { Layout } from "src/layout";
import { NotUser } from "src/layout/NotUser";

import { IsLogin } from "./IsLogin";

const History: CustomNextPage = () => {
  const { user } = useUserStatus();

  return <div>{user ? <IsLogin /> : <NotUser />}</div>;
};

History.getLayout = Layout;
export default History;
