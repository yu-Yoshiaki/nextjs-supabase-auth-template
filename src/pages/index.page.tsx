import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { CustomNextPage, GetStaticProps } from "next";
import { Layout } from "src/layout";
import { app } from "src/lib/firebase";
import { ticketConverter } from "src/lib/firebase/converter";
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
  const q = query(collectionRef, where("active", "==", true));
  const docDatas = await getDocs(q);

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
