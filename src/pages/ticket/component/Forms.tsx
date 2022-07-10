import type { FieldValues, UseFormRegister } from "react-hook-form";
import type { Input } from "src/component/Input";

type Input = {
  name: string;
  label: string;
  required: false | { value: true; message: string };
  type:
    | "image"
    | "number"
    | "password"
    | "radio"
    | "tel"
    | "text"
    | "hidden"
    | "email";
  autoComplete?:
    | "name"
    | "postal-code"
    | "postal-code2"
    | "postal-code3"
    | "postal-code4"
    | "email"
    | "tel"
    | "current-password";
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  minLength?: { value: number; message: string };
};

const InputList: Input[] = [
  {
    name: "name",
    label: "お客様名",
    required: { value: true, message: "入力必須項目です" },
    type: "text",
    autoComplete: "name",
    maxLength: {
      value: 255,
      message: "文字数オーバーです。",
    },
  },
  {
    name: "email",
    label: "メールアドレス",
    required: { value: true, message: "入力必須項目です" },
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "電話番号",
    required: { value: true, message: "入力必須項目です" },
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "postCode",
    label: "郵便番号",
    required: false,
    type: "text",
    autoComplete: "postal-code",
  },
];

export const Forms = (props: {
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
}) => {
  const UserNotLogin = () => {
    return (
      <div>
        {InputList.map((data) => {
          return (
            <div className="col-span-6 sm:col-span-3" key={data.name}>
              <div className="flex space-x-4">
                <label htmlFor={data.name} className="flex">
                  <p className="text-gray-700">{data.label}</p>
                  {data.required && <span className="text-red-500">*</span>}
                </label>
                <p className="text-red-500">
                  {props.errors?.[data.name]?.message}
                </p>
              </div>
              <input
                className={
                  "py-1 px-3 w-full text-base leading-8 rounded border border-gray-300 focus:border-blue-400 focus:ring-2 transition-colors duration-200 ease-in-out"
                }
                {...props.register(data.name, {
                  required: data.required,
                  min: data.min,
                  maxLength: data.maxLength,
                  max: data.max,
                  minLength: data.minLength,
                })}
                type={data.type}
                autoComplete={data.autoComplete}
                id={data.name}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <UserNotLogin />
    </div>
  );
};
