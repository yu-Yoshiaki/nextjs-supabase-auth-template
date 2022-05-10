import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "src/layout";
import { app } from "src/lib/firebase";
import { ticketConverter } from "src/lib/firebase/converter";
import type { ReadTicket } from "src/type/ticket";
import { SWRConfig } from "swr";

import { DetailPageLayout } from "./layout/DetailPageLayout";

const firestore = getFirestore(app);

const fetchDocument = async (id: string) => {
  const docRef = doc(firestore, "ticket", id).withConverter(ticketConverter);
  const document = await getDoc(docRef);
  const data = JSON.parse(JSON.stringify(document.data()));
  return data;
};
export const getStaticPaths: GetStaticPaths = async () => {
  const colRef = collection(firestore, "ticket").withConverter(ticketConverter);
  const documents = await getDocs(colRef);

  const paths = documents.docs.map((data) => {
    return { params: { id: data.id } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (paths) => {
  if (paths.params) {
    const docRef = doc(
      firestore,
      "ticket",
      paths.params.id as string
    ).withConverter(ticketConverter);

    const document = await getDoc(docRef);
    const data = JSON.parse(JSON.stringify(document.data()));

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

const Index: CustomNextPage<{ data: ReadTicket }> = (props) => {
  return (
    <SWRConfig
      value={{
        fallback: props.data,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        fetcher: fetchDocument,
      }}
    >
      <DetailPageLayout />
    </SWRConfig>
  );
};

Index.getLayout = Layout;

export default Index;
