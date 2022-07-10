import type { CustomNextPage, GetStaticProps } from "next";
import { Ticketlist } from "src/component/Ticketlist";
import { Layout } from "src/layout";
import { supabase } from "src/lib/supabase";
import type { definitions } from "src/type/supabase";
import { SWRConfig } from "swr";

export type Data = definitions["products"] & {
  prices: Array<definitions["prices"]>;
};

const Index: CustomNextPage<{
  data: Array<Data>;
}> = (props) => {
  return (
    <SWRConfig
      value={{
        fallbackData: props.data,
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
  const { data, error } = await supabase
    .from<Data>("products")
    .select("*, prices(id, unit_amount)")
    .eq("active", "true");

  if (error) return { props: { status: error.message } };

  return {
    props: {
      data,
    },
    revalidate: 5,
  };
};

Index.getLayout = Layout;

export default Index;
