import type { CustomLayout } from "next";
import { DontPurchaseAlert } from "src/component";
import { useGetWindowSize } from "src/hook/useGetWindowSize";

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
      <DontPurchaseAlert />
      <div className="grid grid-cols-1 mx-auto mb-5 min-h-screen md:grid-cols-[auto,1fr] md:px-0 md:pt-[50px]">
        <div className="h-full">
          {windowSize.width > 480 ? <HeaderPC /> : <HeaderSP />}
        </div>
        <main className="pt-[100px] min-h-screen md:overflow-y-auto md:pt-[60px]">
          <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
        </main>
      </div>
      <Footer />
    </div>
  );
};
