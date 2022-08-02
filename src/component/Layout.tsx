import type { CustomLayout } from "next";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { LayoutErrorBoundary } from "./LayoutErrorBoundary";

export const Layout: CustomLayout = (page) => {
  return (
    <div>
      <Header />
      <main className="mt-[80px] min-h-[calc(100vh-160px)] bg-blue-50">
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};
