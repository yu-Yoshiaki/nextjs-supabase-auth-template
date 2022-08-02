import "tailwindcss/tailwind.css";

import type { CustomAppPage } from "next/app";
import Head from "next/head";

const App: CustomAppPage = (props) => {
  const getLayout =
    props.Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <>
      <Head>
        <title>Next.js + SupabaseAuth</title>
      </Head>
      {getLayout(<props.Component {...props.pageProps} />)}
    </>
  );
};

export default App;
