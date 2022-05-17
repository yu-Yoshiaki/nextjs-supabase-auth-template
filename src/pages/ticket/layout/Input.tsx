import type { VFC } from "react";
import type { UseFormRegisterReturn } from "react-hook-form/dist/types";

type Input = {
  label: string;
  required: boolean;
  className: string;
  type?: string;
  autoComplete?: string;
  register: UseFormRegisterReturn;
  errorMessage: any;
};

export const Input: VFC<Input> = (props) => {
  return (
    <div className="col-span-6 sm:col-span-3">
      <div className="flex space-x-4">
        <label>
          {props.label}
          {props.required && <span className="text-red-500">必須</span>}
        </label>
        <p>{props.errorMessage}</p>
      </div>
      <input
        className={props.className}
        {...props.register}
        type={props.type}
        autoComplete={props.autoComplete}
      />
    </div>
  );
};
