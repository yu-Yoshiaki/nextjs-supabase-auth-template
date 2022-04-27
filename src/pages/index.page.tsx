import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { CustomNextPage, GetStaticProps } from "next";
import { Layout } from "src/layout";
import { app, ticketConverter } from "src/lib/firebase";
import type { ReadTicket } from "src/type/ticket";

import { CardLayout } from "./ticket/layout";

const firestore = getFirestore(app);

const Root: CustomNextPage<{ posts: ReadTicket[] }> = (props) => {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-10 px-2 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {props.posts.map((data, index) => {
        return <CardLayout ticket={data} key={data.id} index={index} />;
      })}
    </div>
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
