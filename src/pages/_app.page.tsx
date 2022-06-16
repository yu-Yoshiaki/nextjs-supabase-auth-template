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
        <title>チケットマーケット</title>
        <meta property="og:url" content="https://ticketia.vercel.app/" />
        <meta property="og:type" content="product" />
        <meta property="og:title" content="チケットマーケット" />
        <meta
          property="og:description"
          content="チケット売買アプリケーション"
        />
        <meta
          property="og:site_name"
          content="ホームページのコーディング ポートフォリオ"
        />
        <meta property="og:image" content="/noimage.jpg" />
      </Head>
      {getLayout(<props.Component {...props.pageProps} />)}
    </>
  );
};

export default App;
