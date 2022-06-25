import type { CustomNextPage, GetStaticProps } from "next";
import { Layout } from "src/layout";
import { fetchCollection } from "src/lib/fetchCollection";
import type { ReadTicket } from "src/type/ticket";
import { SWRConfig } from "swr";

import { Ticketlist } from "./component/Ticketlist";

const Index: CustomNextPage<{ posts: ReadTicket[] }> = (props) => {
  return (
    <SWRConfig
      value={{
        fallbackData: props.posts,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <Ticketlist />
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

Index.getLayout = Layout;

export default Index;
