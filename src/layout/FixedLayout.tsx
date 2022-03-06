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
    <div className="grid grid-cols-1 gap-x-4 px-2 pb-4 mx-auto min-h-screen bg-[#e7e0cf] md:grid-cols-[25%,1fr,25%] md:px-0">
      <Header />

      <main className="pt-[150px] md:overflow-y-auto md:pt-0">
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </main>
      {/* 後でコンポーネント書き出す */}
      <div className="bg-white">
        <Profile />
        <Footer />
      </div>
    </div>
  );
};
