export const DateTime = (props: { startDay: string | null }) => {
  return (
    <div className="py-5 px-2 space-y-2 bg-gray rounded-lg">
      <div className="flex space-x-2">
        <p className="font-bold">開催日</p>
        <p>{props.startDay ?? ""}</p>
      </div>
      <div className="flex space-x-2">
        <p className="font-bold">開催時間</p>
        <p>20:00~</p>
      </div>
    </div>
  );
};
