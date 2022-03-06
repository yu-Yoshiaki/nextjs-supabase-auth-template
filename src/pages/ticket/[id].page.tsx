/* eslint-disable react/jsx-handler-names */
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BaseButtonClass } from "src/component/Button";
import { useUser } from "src/hook/useUser";
import { FixedLayout } from "src/layout";
import { firestore, ticketConverter } from "src/lib/firebase";
import type { Ticket } from "src/type/ticket";

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
      };
    }
  }

  return {
    notFound: true,
  };
};

const Index: CustomNextPage<{ posts: Ticket }> = (props) => {
  const { user } = useUser();
  const router = useRouter();
  const [sessionUrl, setSessionUrl] = useState<string>();

  useEffect(() => {
    if (sessionUrl) {
      window.location.href = sessionUrl;
    }
  }, [sessionUrl]);

  const handleSubmit = async () => {
    const res = await axios.post("/api/checkoutSession", {
      stripePriceId: props.posts.stripePriceId,
    });

    const data = await res.data;
    setSessionUrl(data);

    return;
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}

        <Image
          width={1000}
          height={600}
          src={"/pixels.jpg"}
          alt={"test"}
          className="object-cover object-center w-full h-full"
        />

        {/* Product info */}
        <div className="px-4 pt-10 pb-16 mx-auto max-w-2xl sm:px-6 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24 lg:max-w-7xl">
          <div className="lg:col-span-2 lg:pr-8 lg:border-r lg:border-gray-200">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{props.posts.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{props.posts.description}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pr-8 lg:pb-16 lg:border-r lg:border-gray-200">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{props.posts.priceList.nomal.price}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="pl-4 space-y-2 text-sm list-disc"></ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{props.posts.address.address}</p>
              </div>
            </div>
          </div>
        </div>

        {user ? (
          <form onSubmit={handleSubmit} method={"POST"} className="flex justify-center items-center">
            <button type="submit" role="link" className={BaseButtonClass}>
              Checkout
            </button>
          </form>
        ) : (
          <button
            onClick={() => {
              router.push("/auth/login");
            }}
            className={BaseButtonClass}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

Index.getLayout = FixedLayout;

export default Index;
