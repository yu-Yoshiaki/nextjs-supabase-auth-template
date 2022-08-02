import type { CustomNextPage } from "next";
import { Layout, List } from "src/component";

const Auth: CustomNextPage = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <List />
    </div>
  );
};

Auth.getLayout = Layout;

export default Auth;
