import { loadStripe } from "@stripe/stripe-js";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "src/layout";
import { firestore, ticketConverter } from "src/lib/firebase";
import type { ReadTicket } from "src/type/ticket";

import { DetailPageLayout } from "./DetailPageLayout";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export const getStaticPaths: GetStaticPaths = async () => {
  const colRef = collection(firestore, "ticket").withConverter(ticketConverter);
  const document = await getDocs(colRef);
  const paths = document.docs.map((data) => {
    return { params: { id: data.id } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (paths) => {
  if (paths.params) {
    const colRef = doc(firestore, "ticket", paths.params.id as string).withConverter(ticketConverter);
    const document = await getDoc(colRef);

    const posts = JSON.parse(JSON.stringify(document.data()));
    // const posts = document.data();
    if (document) {
      return {
        props: {
          posts,
        },
        revalidate: 5,
      };
    }
  }

  return {
    notFound: true,
  };
};

const Index: CustomNextPage<{ posts: ReadTicket }> = (props) => {
  return <DetailPageLayout ticket={props.posts} test={false} />;
};

Index.getLayout = Layout;

export default Index;
