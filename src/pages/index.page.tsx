import type { CustomNextPage, GetStaticProps } from "next";
import { Layout } from "src/layout";
import { fetchCollection } from "src/lib/fetchCollection";
import type { ReadTicket } from "src/type/ticket";
import { SWRConfig } from "swr";

import { ProductList } from "./customer/ticket/component";

const Root: CustomNextPage<{ posts: ReadTicket[] }> = (props) => {
  return (
    <SWRConfig
      value={{
        fallback: props.posts,
        fallbackData: props.posts,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <ProductList />
    </SWRConfig>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchCollection();

  return {
    props: {
      posts,
    },
    revalidate: 5,
  };
};

Root.getLayout = Layout;

export default Root;
