import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  w?: string;
  h?: string;
};

export const FillImage = (props: Props) => {
  return (
    <div
      className={`relative rounded-lg ${props.w ?? "md:w-full"} ${
        props.h ?? "h-[300px] md:h-[500px]"
      }`}
    >
      <Image
        src={props.src ?? "/noimage.jpg"}
        alt={props.alt ?? ""}
        className="object-cover object-center w-full h-full rounded-lg"
        layout={"fill"}
        objectFit={"cover"}
      />
    </div>
  );
};
