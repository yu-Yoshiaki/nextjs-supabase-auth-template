import Image from "next/image";
import type { VFC } from "react";
// import { useEffect, useState } from "react";
import { BaseButtonClass } from "src/component/Button";
import { useUser } from "src/hook/useUser";
import type { Ticket } from "src/type/ticket";

export const DetailPageLayout: VFC<{ ticket: Ticket }> = (props) => {
  const { user } = useUser();

  // const [sessionUrl, setSessionUrl] = useState<string>();

  // useEffect(() => {
  //   console.log("session---", sessionUrl);

  //   if (sessionUrl) {
  //     window.location.href = sessionUrl;
  //   }
  // }, [sessionUrl]);

  // const handleSubmit = async () => {
  //   const res = await axios.post(`/api/checkoutSession/${props.posts.stripePriceId}`);

  //   const redirect = await res.data;
  //   console.log("-------------");
  //   console.log("-------------", redirect);
  //   console.log("-------------");

  //   window.location.href = redirect;
  //   return;
  // };

  return (
    <div className="pb-4 tracking-wide leading-relaxed bg-white">
      <div className="pt-6">
        {/* Image gallery */}

        <Image
          width={1000}
          height={600}
          src={"/bread.jpg"}
          alt={"test"}
          className="object-cover object-center w-full h-full"
        />

        {/* Product info */}
        <div className="px-4 pb-16 mx-auto space-y-10 max-w-2xl sm:px-6 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24 lg:max-w-7xl">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">{props.ticket.name}</h1>

          {/* Options */}
          <div className="space-y-2">
            <h2 className=" text-xl font-bold">プロジェクト内容</h2>
            <p className="text-lg text-gray-900">{props.ticket.description}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Price</h2>
            <div className="p-4 rounded-md border-2 border-red-200 shadow-md">
              <p>{props.ticket.priceList.nomal.content}</p>
              <p>{props.ticket.priceList.nomal.price} yen</p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">会場</h2>
            <iframe
              width="100%"
              height="400px"
              frameBorder="0"
              title="map"
              marginHeight={0}
              marginWidth={0}
              scrolling="no"
              src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </div>

       
          
            {props.ticket.stripePriceId && (
              <form
                method={"POST"}
                action={`/api/checkout_session/${props.ticket.stripePriceId}`}
                className="flex justify-center items-center"
              >
                <button type="submit" role="link" className={BaseButtonClass}>
                  Checkout
                </button>
              </form>
            )}
          
        
      </div>
    </div>
  );
};
