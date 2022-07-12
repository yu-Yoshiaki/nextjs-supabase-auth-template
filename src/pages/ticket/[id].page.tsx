import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Container } from "src/component/Container";
import { FillImage } from "src/component/FillImage";
import { Layout } from "src/layout";
import { supabase } from "src/lib/supabase";
import type { Data } from "src/pages/index.page";
import {
  // Checkout,
  DateTime,
  Description,
  Organizer,
  TicketName,
} from "src/pages/ticket/component";
import { CheckoutSession } from "src/pages/ticket/component/CheckoutSession";
import type { definitions } from "src/type/supabase";
import { SWRConfig } from "swr";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase
    .from<definitions["products"]>("products")
    .select("id");

  return {
    paths:
      data?.map((d) => {
        return `/ticket/${d.id}`;
      }) || [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (paths) => {
  if (paths.params) {
    const { data } = await supabase
      .from<Data>("products")
      .select("*, prices(id, unit_amount)")
      .eq("id", paths.params.id);

    return {
      props: {
        data,
      },
      revalidate: 5,
    };
  }

  return {
    notFound: true,
  };
};

const Index: CustomNextPage<{
  data: Data[];
}> = (props) => {
  const metadata = props.data[0].metadata as {
    startDay: string | null;
    description: string;
    location?: string;
    lng?: number;
    lat?: number;
  };

  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <Container>
        <div className="py-6 tracking-wide leading-relaxed">
          {props.data && (
            <article>
              <Head>
                <title>{props.data[0].name} | Ticket Market</title>
                <meta property="og:image" content={props.data[0].image} />
              </Head>
              <div className="grid gap-4 px-4 mx-auto md:grid-cols-3 md:px-0 md:w-[80%]">
                <div className="md:col-span-3">
                  <FillImage src={props.data[0].image} />
                </div>

                <div className="col-span-2 p-4 space-y-4 bg-white rounded-lg">
                  <TicketName name={props.data[0].name as string} />
                  <DateTime startDay={metadata.startDay} />
                  <Description
                    description={props.data[0].description as string}
                  />
                  {/* {metadata.location && <Address {...metadata} />} */}
                  <Organizer />
                </div>

                <CheckoutSession priceid={props.data[0].prices[0].id} />
                {/* <div>
                  <Checkout
                    priceData={props.data[0].prices}
                    productData={props.data}
                  />
                  <button onClick={handleClick}>Checkout</button>
                </div> */}
              </div>
            </article>
          )}
        </div>
      </Container>
    </SWRConfig>
  );
};

Index.getLayout = Layout;

export default Index;
