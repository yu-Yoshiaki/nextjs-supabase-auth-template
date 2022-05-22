import type { VFC } from "react";
import type { UseFormRegister } from "react-hook-form";
import type {
  TypeEmail,
  TypeRadio,
  TypeSelect,
  TypeTel,
  TypeText,
  TypeTextarea,
  TypeUrl,
} from "src/type/vendor";

import { Radio, Select, Text, Textarea } from ".";

type Props = {
  item:
    | TypeEmail
    | TypeRadio
    | TypeSelect
    | TypeTel
    | TypeText
    | TypeUrl
    | TypeTextarea;
  register: UseFormRegister<Record<string, any>>;
};

export const InputType: VFC<Props> = (props) => {
  if (props.item.type === "radio") {
    return <Radio item={props.item as TypeRadio} register={props.register} />;
  }
  if (props.item.type === "select") {
    return <Select item={props.item as TypeSelect} register={props.register} />;
  }
  if (props.item.type === "textarea") {
    return (
      <Textarea item={props.item as TypeTextarea} register={props.register} />
    );
  }
  return <Text item={props.item as TypeText} register={props.register} />;
};
