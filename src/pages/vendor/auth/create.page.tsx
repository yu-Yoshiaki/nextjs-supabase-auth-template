import type { CustomNextPage } from "next";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useManageAccount } from "src/hook/vendor/useManageAccount";
import { InputLayout, InputType } from "src/pages/vendor/auth/component";
import type {
  TypeEmail,
  TypeRadio,
  TypeSelect,
  TypeTel,
  TypeText,
  TypeTextarea,
  TypeUrl,
} from "src/type/vendor";
import type Stripe from "stripe";

const Create: CustomNextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createAccount, createAccountLink } = useManageAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    async (e) => {
      setIsLoading(true);
      const params: Stripe.AccountCreateParams = { ...e };
      const { id } = await createAccount(params);
      await createAccountLink(id);
      setIsLoading(false);
    },
    [createAccount, createAccountLink]
  );

  const inputItems: (
    | TypeEmail
    | TypeRadio
    | TypeSelect
    | TypeTel
    | TypeText
    | TypeUrl
    | TypeTextarea
  )[] = [
    {
      id: "business_type",
      label: "事業形態",
      type: "radio",
      radioItem: [
        { id: "individual" },
        { id: "company" },
        { id: "non_profit" },
      ],
      errorMessage: errors.business_type?.message,
    },
    // {
    //   id: "first_name_kanji",
    //   label: "氏名",
    //   type: "text",
    //   errorMessage: errors.first_name_kanji?.message,
    //   placeholder: "姓",
    // },
    // {
    //   id: "last_name_kanji",
    //   label: "氏名",
    //   type: "text",
    //   errorMessage: errors.last_name_kanji?.message,
    //   placeholder: "名",
    // },
    // {
    //   id: "first_name_kana",
    //   label: "氏名(かな)",
    //   type: "text",
    //   errorMessage: errors.first_name_kana?.message,
    //   placeholder: "姓",
    // },
    // {
    //   id: "last_name_kana",
    //   label: "氏名(かな)",
    //   type: "text",
    //   errorMessage: errors.last_name_kana?.message,
    //   placeholder: "名",
    // },
    // {
    //   id: "email",
    //   label: "メールアドレス",
    //   type: "email",
    //   autoComplete: "email",
    //   errorMessage: errors.email?.message,
    //   placeholder: "test.satou@example.com",
    // },
    // {
    //   id: "businessProfileMcc",
    //   label: "事業カテゴリー",
    //   type: "select",
    //   selectItem: [
    //     { value: "", text: "選んでください。" },
    //     { value: "Dog", text: "Dog" },
    //     { value: "Cat", text: "Cat" },
    //     { value: "Bird", text: "Bird" },
    //   ],
    //   errorMessage: errors.businessProfileMcc?.message,
    // },
    // {
    //   id: "businessProfileProductDescription",
    //   label: "事業詳細",
    //   type: "textarea",
    //   errorMessage: errors.businessProfileProductDescription?.message,
    // },
  ];

  return (
    <div>
      {isLoading && (
        <div className="flex fixed inset-0 justify-center bg-white">
          <div className="w-10 h-10 rounded-full border-4 border-blue border-t-transparent animate-spin"></div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="text-center">
        {inputItems.map((item) => {
          return (
            <InputLayout item={item} key={item.id}>
              <InputType item={item} register={register} />
            </InputLayout>
          );
        })}
        <input
          type="submit"
          value="送信"
          className={`${isLoading && "animate-spin"}`}
        />
      </form>
    </div>
  );
};

export default Create;
