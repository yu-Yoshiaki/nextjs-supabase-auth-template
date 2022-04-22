import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "src/layout";
import { firestore, ticketConverter } from "src/lib/firebase";
import type { ReadPrice, ReadTicket } from "src/type/ticket";

import { DetailPageLayout } from "./layout/DetailPageLayout";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

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
  // console.log("front", props.prices);
  const [prices, setPrices] = useState<ReadPrice[]>();

  const fetchPrices = useCallback(async () => {
    const res = await axios.get(`/api/fb/price/${props.data.id}/get`);
    const prices: ReadPrice[] = await res.data;
    setPrices(prices);
  }, [props.data.id]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  return <DetailPageLayout ticket={props.data} test={false} prices={prices} />;
};

Index.getLayout = Layout;

export default Index;
