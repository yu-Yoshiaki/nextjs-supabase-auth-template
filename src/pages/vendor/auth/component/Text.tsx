import type { UseFormRegister } from "react-hook-form";
import type { TypeText } from "src/type/vendor";

type Props = {
  item: TypeText;
  register: UseFormRegister<Record<string, any>>;
};

export const Text = (props: Props) => {
  return (
    <input
      {...props.item}
      {...props.register(props.item.id, {
        required: { value: true, message: "入力してください。" },
      })}
      className="w-[300px] rounded-md border-gray"
    />
  );
};
