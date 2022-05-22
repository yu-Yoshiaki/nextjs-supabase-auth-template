export type BaseInputField = {
  id: string;
  label: string;
  errorMessage: any;
  placeholder?: string;
};

export type TypeEmail = BaseInputField & {
  type: "email";
  autoComplete: "email";
};
export type TypeTel = BaseInputField & {
  type: "tel";
  autoComplete: "tel";
};
export type TypeUrl = BaseInputField & {
  type: "url";
  autoComplete: "url";
};
export type TypeRadio = BaseInputField & {
  type: "radio";
  radioItem: { id: string }[];
};
export type TypeSelect = BaseInputField & {
  type: "select";
  selectItem: { value: string; text: string }[];
};
export type TypeTextarea = BaseInputField & {
  type: "textarea";
};
export type TypeText = BaseInputField & {
  type: "text";
  autoComplete?:
    | "family-name"
    | "given-name"
    | "postal-code"
    | "address-level1"
    | "address-level2"
    | "address-level3"
    | "address-level4"
    | "bday";
};
