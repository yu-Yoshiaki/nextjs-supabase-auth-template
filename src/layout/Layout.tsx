import type { CustomLayout } from "next";
import { useGetWindowSize } from "src/hook/useGetWindowSizze";

import { Footer } from "./Footer";
import { HeaderPC } from "./HeaderPC";
import { HeaderSP } from "./HeaderSP";
import { LayoutErrorBoundary } from "./LayoutErrorBoundary";

/**
 * @package
 */
export const Layout: CustomLayout = (page) => {
  const { windowSize } = useGetWindowSize();
  return (
    <div>
      <p className="fixed inset-x-0 top-0 z-30 font-bold text-center bg-yellow">
        テスト版のため、実際には購入できません。
      </p>
      <div className="grid grid-cols-1 mx-auto mb-5 min-h-screen md:grid-cols-[auto,1fr] md:px-0 md:pt-[50px]">
        <div className="h-full">
          {windowSize.width > 480 ? <HeaderPC /> : <HeaderSP />}
        </div>
        <main className="pt-[150px] min-h-screen md:overflow-y-auto md:pt-[60px]">
          <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
        </main>
      </div>
      <Footer />
    </div>
  );
};
