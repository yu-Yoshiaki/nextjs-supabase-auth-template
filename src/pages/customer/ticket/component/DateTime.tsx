export const DateTime = (props: { startDay: string | null }) => {
  const data = [
    { name: "開催日", value: props.startDay ?? "" },
    { name: "開催時間", value: "20:00~" },
  ];

  return (
    <div className="py-5 px-8 space-y-2 bg-gray-200 rounded-lg shadow-md">
      {data.map((data) => {
        return (
          <div key={data.name} className="flex space-x-2">
            <p className="font-bold">{data.name}</p>
            <p>{data.value}</p>
          </div>
        );
      })}
    </div>
  );
};
