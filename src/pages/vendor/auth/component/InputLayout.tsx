import type { ReactChild } from "react";
import type {
  TypeEmail,
  TypeRadio,
  TypeSelect,
  TypeTel,
  TypeText,
  TypeTextarea,
  TypeUrl,
} from "src/type/vendor";

type Props = {
  item:
    | TypeEmail
    | TypeRadio
    | TypeSelect
    | TypeTel
    | TypeText
    | TypeUrl
    | TypeTextarea;
  children: ReactChild;
};

export const InputLayout = (props: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <div className="flex space-x-4">
          <label htmlFor={props.item.id}>
            {props.item.label}
            <span className="text-red-500">※</span>
          </label>
          <p className="text-red-500">{props.item.errorMessage}</p>
        </div>
        {props.children}
      </div>
    </div>
  );
};
