import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Root: CustomNextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/consumer");
  }, [router]);

  return <div></div>;
};

export default Root;
