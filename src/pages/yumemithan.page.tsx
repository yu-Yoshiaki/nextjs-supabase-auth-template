import type { CustomNextPage } from "next";
import Image from "next/image";
import type { VFC } from "react";

export const Card: VFC<{ name: string; info: string }> = (props) => {
  return (
    <div className="pb-20 min-h-[200px] bg-white border border-gray-900">
      <div>
        <Image src={"/women.jpg"} alt={"artist image"} width={1000} height={800} />
      </div>
      <h2 className="text-2xl font-bold text-center">{props.name}</h2>
      <p className="px-4">{props.info}</p>
    </div>
  );
};
const YumeMithan: CustomNextPage = () => {
  return (
    <div className="bg-black">
      <header className="flex justify-center items-center h-[80px] ">
        <h1 className="text-4xl font-bold text-yellow-300">YUME&MITHAN</h1>
      </header>
      <main>
        <section>
          <div className="relative min-h-screen">
            <video src="/test.mp4" autoPlay={true} loop={true} playsInline={true} muted={true}></video>
          </div>
          <div className="absolute right-0 bottom-0 left-0 z-50 bg-black opacity-60"></div>
        </section>

        <section className="px-6 space-y-8">
          <Card name={"Mithan"} info={"I am Dancer."} />
          <Card name={"Yume"} info={"I am Dancer."} />
        </section>
      </main>
      <footer className="flex justify-center items-center h-20 text-white">&copy; 2022 Yume&Mithan</footer>
    </div>
  );
};

export default YumeMithan;
