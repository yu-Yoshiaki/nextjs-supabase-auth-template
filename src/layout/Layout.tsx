import type { CustomLayout } from "next";
import { Profile } from "src/layout/Profile";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { LayoutErrorBoundary } from "./LayoutErrorBoundary";

/**
 * @package
 */
export const Layout: CustomLayout = (page) => {
  return (
    <div className="">
      <p className="fixed inset-x-0 top-0 z-30 content-center px-2 h-[50px] font-bold text-center bg-yellow">
        テスト版のため、実際には購入できません。
      </p>
      <div className="grid grid-cols-1 mx-auto min-h-screen font-sans md:grid-cols-[auto,1fr,25%] md:px-0 md:pt-[50px]">
        <div className="h-full border-b shadow-md">
          <Header />
        </div>
        <main className="pt-[150px] min-h-screen md:overflow-y-auto md:pt-0">
          <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
        </main>
        {/* 後でコンポーネント書き出す */}
        <div className="border-l">
          <Profile />
          <Footer />
        </div>
      </div>
    </div>
  );
};
