import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { CustomNextPage, GetStaticProps } from "next";
import { Layout } from "src/layout";
import { app, ticketConverter } from "src/lib/firebase";
import type { ReadTicket } from "src/type/ticket";
import { SWRConfig } from "swr";

import { ProductList } from "./ticket/layout";

const firestore = getFirestore(app);

const Root: CustomNextPage<{ posts: ReadTicket[] }> = (props) => {
  return (
    <SWRConfig
      value={{
        fallback: props.posts,
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
  const collectionRef = collection(firestore, "ticket").withConverter(
    ticketConverter
  );
  const docDatas = await getDocs(collectionRef);

  const data = docDatas.docs.map((d) => {
    return d.data();
  });

  // DateTime型のデータをそのまま読み込もうとするとエラーが起こるっぽい
  // JSONにシリアライズ可能なデータ型のみを返す
  const posts = JSON.parse(JSON.stringify(data));

  return {
    props: {
      posts,
    },
    revalidate: 5,
  };
};

Root.getLayout = Layout;

export default Root;
