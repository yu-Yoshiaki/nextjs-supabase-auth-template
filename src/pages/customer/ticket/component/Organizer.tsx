import Image from "next/image";

export const Organizer = () => {
  const data = {
    name: "TICKETIA",
    tel: "090-1234-5678",
    address: "東京都渋谷区道玄坂1−234−5",
  };

  return (
    <div className="py-10 px-4 bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="flex justify-center items-center space-x-5 w-full">
        <Image
          width={120}
          height={120}
          src={"/noimage.jpg"}
          alt={"test"}
          className="rounded-full"
        />

        <div>
          <p className="text-xl font-bold text-left">{data.name}</p>
          <p className="text-left">{data.tel}</p>
          <p className="text-left">{data.address}</p>
        </div>
      </div>
    </div>
  );
};
