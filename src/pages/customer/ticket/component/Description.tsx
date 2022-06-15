type Props = {
  description: string;
};

export const Description = (props: Props) => {
  return (
    <p className="p-8 w-full  bg-white rounded-md border border-gray-200 md:text-lg">
      {props.description}
    </p>
  );
};
