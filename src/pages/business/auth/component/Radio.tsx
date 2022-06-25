import type { UseFormRegister } from "react-hook-form";
import type { TypeRadio } from "src/type/vendor";

type Props = {
  item: TypeRadio;
  register: UseFormRegister<Record<string, any>>;
};

export const Radio = (props: Props) => {
  return (
    <div className="w-[300px] text-left rounded-md border-gray-100">
      {props.item.radioItem?.map((item) => {
        return (
          <div key={item.id}>
            <input
              type={props.item.type}
              id={item.id}
              value={item.id}
              {...props.register(props.item.id, {
                required: { value: true, message: "入力してください。" },
              })}
            />

            <label htmlFor={item.id}>{item.id}</label>
          </div>
        );
      })}
    </div>
  );
};
