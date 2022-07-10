import "tailwindcss/tailwind.css";

import type { CustomAppPage } from "next/app";
import Head from "next/head";
import { CartProvider } from "use-shopping-cart";

const App: CustomAppPage = (props) => {
  const getLayout =
    props.Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string}
        currency="JPY"
        successUrl="http://localhost:3000"
        cancelUrl="http://localhost:3000"
      >
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
      </CartProvider>
    </>
  );
};

export default App;
