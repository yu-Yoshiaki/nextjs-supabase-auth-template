import type { CustomNextPage } from "next";
import { useUserSession } from "src/hook/useUserSession";
import { Layout } from "src/layout";

import { HistoryList } from "./component/HistoryList";
import { NotUser } from "./component/NotUser";

const History: CustomNextPage = () => {
  const { session } = useUserSession();

  return <div>{session ? <HistoryList /> : <NotUser />}</div>;
};

History.getLayout = Layout;
export default History;
