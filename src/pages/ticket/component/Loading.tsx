export const Loading = () => {
  return (
    <div
      className={`pb-5 border border-gray w-full max-w-[391px] mx-auto bg-white rounded-xl`}
    >
      <div className="p-2 mb-5 w-full h-[42px] bg-gray-200 animate-pulse"></div>
      <div className="pl-3 mb-10 h-[40px]">
        <div className="w-[180px] h-[25px] bg-gray-200 animate-pulse"></div>
      </div>
      <div className="flex justify-between mr-1 mb-16 ml-3 h-[32px]">
        <div className="py-1 px-2 w-[60px] bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-[146px] bg-gray-200 animate-pulse"></div>
      </div>

      <div className="flex justify-center items-center">
        <div className="py-4 px-20 w-[256px] h-[58px] bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};
