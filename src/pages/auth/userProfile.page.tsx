import type { CustomNextPage } from "next";
import { useEffect } from "react";
import { useUser } from "src/hook/useUser";
import { Layout } from "src/layout";

const UserProfile: CustomNextPage = () => {
  const { userInfomation, fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, [fetchUser, userInfomation]);
  return (
    <div className="py-4 px-4 space-y-4 min-h-[200px] rounded-md shadow-lg">
      <div className="grid grid-rows-2 justify-center items-center space-x-3 text-2xl font-semibold text-center">
        <p className="text-sm">名前</p>
        <p>{userInfomation?.name}</p>
      </div>
      <div className="grid grid-rows-2 justify-center items-start space-x-3 text-2xl font-semibold">
        <p className="text-sm whitespace-nowrap">プロフィール</p>
        <p className="text-lg text-left">{userInfomation?.profile}</p>
      </div>
    </div>
  );
};

UserProfile.getLayout = Layout;

export default UserProfile;
