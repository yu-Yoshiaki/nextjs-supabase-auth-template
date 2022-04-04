import type { CustomNextPage } from "next";
import Image from "next/image";

const Address = () => {
  return (
    <div className="bg-gray">
      <div className="flex py-5  px-2 space-x-2">
        <p className="font-bold">開催場所</p>
        <p>東京都渋谷区道玄坂1−234−5 渋谷センタービル2F</p>
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
  );
};
const Checkout = () => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-3xl font-bold ">JPY 1000</p>

      <form method={"POST"} action={`/`} className="flex justify-center items-center">
        <button type="submit" role="link" className={"flex justify-center items-center py-4 px-16 bg-blue"}>
          Checkout
        </button>
      </form>
    </div>
  );
};

const DateAndTime = () => {
  return (
    <div className="py-5 px-2 space-y-2 bg-gray">
      <div className="flex space-x-2">
        <p className="font-bold">開催日</p>
        <p>8/20</p>
      </div>
      <div className="flex space-x-2">
        <p className="font-bold">開催時間</p>
        <p>20:00~</p>
      </div>
    </div>
  );
};

const Overview = () => {
  return (
    <div>
      <h1 className="py-5 text-4xl font-extrabold text-left">{"TICKETIA 公式イベント"}</h1>
      <p className=" p-20 w-full min-h-[120px] text-lg border border-gray">
        TICKETIA主催　公式イベント。豪華ゲスト出演。ここでしか聞けない貴重なトークが聞けます。人生楽しみましょう
      </p>
    </div>
  );
};

const Organizer = () => {
  const datas = [
    { title: "主催者", value: "TICKETIA" },
    { title: "TEL", value: "090-1234-5678" },
    { title: "住所", value: "東京都渋谷区道玄坂1−234−5" },
  ];
  return (
    <div className="w-full border border-gray">
      <ul className="space-y-3">
        {datas.map((data) => {
          return (
            <li className="flex space-x-10 border-b border-pink" key={data.title}>
              <p className="w-[80px] text-xl text-left">{data.title}</p>
              <p className="text-xl">{data.value}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Test: CustomNextPage = () => {
  return (
    <div className="pb-4 tracking-wide leading-relaxed">
      <div className="pt-6 text-center">
        {/* Image gallery */}

        <Image
          width={800}
          height={480}
          src={"/bread.jpg"}
          alt={"test"}
          className="object-cover object-center w-full h-full"
        />

        {/* Product info */}
        <div className="px-4 pb-16 mx-auto space-y-10 max-w-2xl sm:px-6 ">
          <Overview />
          <DateAndTime />
          <Checkout />
          <Address />
          <Organizer />
        </div>
      </div>
    </div>
  );
};

export default Test;
