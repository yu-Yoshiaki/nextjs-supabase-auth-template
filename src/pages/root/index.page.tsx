import { collection, getDocs } from "firebase/firestore";
import type { CustomNextPage, GetStaticProps } from "next";
import { Layout } from "src/layout";
import { firestore, ticketConverter } from "src/lib/firebase";
import { TicketList } from "src/pages/ticket/TicketList";
import type { Ticket } from "src/type/ticket";

const Root: CustomNextPage<{ posts: Ticket[] }> = (props) => {
  return (
    <div>
      <TicketList data={props.posts} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const collectionRef = collection(firestore, "ticket").withConverter(ticketConverter);
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
