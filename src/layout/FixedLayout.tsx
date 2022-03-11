import type { CustomLayout } from "next";
import { Profile } from "src/layout/Profile";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { LayoutErrorBoundary } from "./LayoutErrorBoundary";

/**
 * @package
 */
export const FixedLayout: CustomLayout = (page) => {
  return (
    <div className="grid grid-cols-1 gap-x-4 mx-auto min-h-screen font-sans md:grid-cols-[auto,1fr,25%] md:px-0">
      <div className="bg-white border-b border-gray-100 shadow-md">
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
  );
};
