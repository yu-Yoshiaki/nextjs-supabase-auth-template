import type { UseFormRegister } from "react-hook-form";
import type { TypeSelect } from "src/type/vendor";

type Props = {
  item: TypeSelect;
  register: UseFormRegister<Record<string, any>>;
};

export const Select = (props: Props) => {
  return (
    <select
      {...props.register(props.item.id, {
        required: { value: true, message: "入力してください。" },
      })}
      id={props.item.id}
      className="w-[300px] rounded-md border-gray-100"
    >
      {props.item.selectItem?.map((item) => {
        return (
          <option value={item.value} key={item.value}>
            {item.text}
          </option>
        );
      })}
    </select>
  );
};
