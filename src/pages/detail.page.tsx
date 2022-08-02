import type { CustomNextPage } from "next";
import { Layout } from "src/component";
import { useUserSession } from "src/hook/useUserSession";

const Detail: CustomNextPage = () => {
  const { session } = useUserSession();

  if (!session)
    return (
      <div className="flex justify-center items-center py-20 ">
        <div className="min-h-[400px] bg-white md:w-[500px]">
          <h2 className="text-3xl font-bold text-center text-gray-600 bg-white">
            こちらのページは会員専用です。
          </h2>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center py-20 ">
      <div className="min-h-[400px] bg-white md:w-[500px]">
        <h2 className="text-3xl font-bold text-center text-gray-600 bg-white">
          詳細ページ
        </h2>
      </div>
    </div>
  );
};

Detail.getLayout = Layout;

export default Detail;
