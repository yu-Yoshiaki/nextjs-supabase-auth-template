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
    <div>
      <p className="fixed top-0 right-0 left-0 z-30 px-2 font-bold text-center bg-yellow-400">
        テスト版のため、実際には購入できません。
      </p>
      <div className="grid grid-cols-1 mx-auto min-h-screen font-sans md:grid-cols-[auto,1fr,25%] md:px-0 md:pt-[24px]">
        <div className="h-full bg-white border-b border-gray-100 shadow-md">
          <Header />
        </div>
        <main className="pt-[150px] min-h-screen bg-gray-100 md:overflow-y-auto md:pt-0">
          <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
        </main>
        {/* 後でコンポーネント書き出す */}
        <div className="text-white bg-gray-700 border-l border-white">
          <Profile />
          <Footer />
        </div>
      </div>
    </div>
  );
};
