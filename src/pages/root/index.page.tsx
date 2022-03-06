import { collection, getDocs } from "firebase/firestore";
import type { CustomNextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useUser } from "src/hook/useUser";
import { FixedLayout } from "src/layout";
import { firestore, ticketConverter } from "src/lib/firebase";
import { TicketList } from "src/pages/ticket/TicketList";
import type { Ticket } from "src/type/ticket";

const Root: CustomNextPage<{ posts: Ticket[] }> = (props) => {
  const { user } = useUser();
  const router = useRouter();

  const handleClick = () => {
    const href = user ? "/ticket/create" : "/auth/login";
    router.push(href);
  };

  return (
    <div>
      <TicketList data={props.posts} />
      <button
        onClick={handleClick}
        className="fixed right-5 bottom-12 p-8 text-lg font-bold text-white bg-blue-600 rounded-full ring ring-blue-400 shadow-lg md:right-56"
      >
        new
      </button>
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
  };
};

Root.getLayout = FixedLayout;

export default Root;
