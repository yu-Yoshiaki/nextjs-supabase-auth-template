import type { CustomLayout } from "next";
import { useGetWindowSize } from "src/hook/useGetWindowSize";

import { Footer } from "./Footer";
import { HeaderPC } from "./HeaderPC";
import { HeaderSP } from "./HeaderSP";
import { LayoutErrorBoundary } from "./LayoutErrorBoundary";

export const Layout: CustomLayout = (page) => {
  const { windowSize } = useGetWindowSize();
  return (
    <div>
      {windowSize.width > 480 ? <HeaderPC /> : <HeaderSP />}
      <main className="mt-[80px] min-h-[calc(100vh-160px)] bg-blue-50">
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </main>
      <Footer />{" "}
    </div>
  );
};
