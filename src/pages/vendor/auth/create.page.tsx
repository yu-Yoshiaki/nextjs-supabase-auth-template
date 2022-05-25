import type { CustomNextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useManageAccount } from "src/hook/vendor/useManageAccount";
import { Layout } from "src/layout";
import {
  Attention,
  InputLayout,
  InputType,
} from "src/pages/vendor/auth/component";
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

const inputItems: (
  | TypeEmail
  | TypeRadio
  | TypeSelect
  | TypeTel
  | TypeText
  | TypeUrl
  | TypeTextarea
)[] = [
  // {
  //   id: "business_type",
  //   label: "事業形態",
  //   type: "radio",
  //   radioItem: [{ id: "individual" }, { id: "company" }, { id: "non_profit" }],
  // },
  // {
  //   id: "first_name_kanji",
  //   label: "氏名",
  //   type: "text",
  //   placeholder: "姓",
  // },
  // {
  //   id: "last_name_kanji",
  //   label: "氏名",
  //   type: "text",
  //   placeholder: "名",
  // },
  // {
  //   id: "first_name_kana",
  //   label: "氏名(かな)",
  //   type: "text",
  //   placeholder: "姓",
  // },
  // {
  //   id: "last_name_kana",
  //   label: "氏名(かな)",
  //   type: "text",
  //   placeholder: "名",
  // },
  {
    id: "email",
    label: "メールアドレス",
    type: "email",
    autoComplete: "email",
    placeholder: "test.satou@example.com",
  },
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
  // },
  // {
  //   id: "businessProfileProductDescription",
  //   label: "事業詳細",
  //   type: "textarea",
  // },
];

const Create: CustomNextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createAccount, createAccountLink } = useManageAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e: any) => {
    setIsLoading(true);
    const params: Stripe.AccountCreateParams = { ...e };
    const { id } = await createAccount(params);
    await createAccountLink(id);
    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-[700px] text-center">
      <div className="space-y-3">
        <h2>チケットオーナーアカウント作成</h2>
        <Attention />
        <div className="p-10 rounded-lg border border-gray">
          <form onSubmit={handleSubmit(onSubmit)} className="text-center">
            {inputItems.map((item) => {
              return (
                <InputLayout key={item.id} item={item} errorMessage={errors}>
                  <InputType item={item} register={register} />
                </InputLayout>
              );
            })}
            <div className="relative py-2 px-5">
              <input type="submit" value="送信" />
              {isLoading && (
                <div className="flex absolute inset-0 justify-center bg-white">
                  <div className="w-5 h-5 rounded-full border-4 border-blue border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Create.getLayout = Layout;

export default Create;
