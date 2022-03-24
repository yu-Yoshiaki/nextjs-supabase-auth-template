import Image from "next/image";
import type { VFC } from "react";
// import { useEffect, useState } from "react";
import { BaseButtonClass } from "src/component/Button";
import type { Ticket } from "src/type/ticket";

export const DetailPageLayout: VFC<{ ticket: Ticket }> = (props) => {
  return (
    <div className="pb-4 tracking-wide leading-relaxed">
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
        <div className="px-4 pb-16 mx-auto space-y-10 max-w-2xl sm:px-6 ">
          <div>
            <h1 className="text-2xl font-extrabold text-center">【{"props.ticket.name"}】</h1>
            <p className="min-h-[120px] text-lg">{"props.ticket.description"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-3xl">¥3000</p>
            <form>
              <button type="submit" role="link" className="flex justify-center items-center py-4 px-16 bg-pink">
                Checkout
              </button>
            </form>
          </div>

          <div className="space-y-2 bg-gray">
            <div className="flex space-x-2">
              <p className="font-bold">開催日</p>
              <p>8/20</p>
            </div>
            <div className="flex space-x-2">
              <p className="font-bold">開催時間</p>
              <p>20:00~</p>
            </div>

            <div className="flex space-x-2">
              <p className="font-bold">開催場所</p>
              <p>東京都渋谷区道玄坂1−234−5　渋谷センタービル2F</p>
            </div>

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
