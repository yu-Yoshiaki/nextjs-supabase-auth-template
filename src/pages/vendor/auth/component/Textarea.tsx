import type { UseFormRegister } from "react-hook-form";
import type { TypeTextarea } from "src/type/vendor";

type Props = {
  item: TypeTextarea;
  register: UseFormRegister<Record<string, any>>;
};

export const Textarea = (props: Props) => {
  return (
    <textarea
      {...props.register(props.item.id, {
        required: { value: true, message: "入力してください。" },
      })}
      id={props.item.id}
      className="w-[300px] h-[200px] rounded-md border-gray"
    />
  );
};
