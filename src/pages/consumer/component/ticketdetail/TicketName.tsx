type Props = {
  name: string;
};

export const TicketName = (props: Props) => {
  return (
    <h1 className="p-8 text-xl font-extrabold text-left bg-white rounded-md border border-gray-200 md:text-3xl">
      {props.name}
    </h1>
  );
};
