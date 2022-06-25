import type { CustomNextPage } from "next";
import { useCallback } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Loading } from "src/component/Loading";
import { useManagePrice } from "src/hook/price/useManagePrice";
import { useManageProduct } from "src/hook/product/useManageProduct";
import { useUserStatus } from "src/hook/useUserStatus";
import { Layout } from "src/layout";
import type { Ticket } from "src/type/ticket";

import { Input } from "./component/Input";
import { Map } from "./component/Map";

const Atention = () => {
  return (
    <div className="p-8 w-full max-w-[700px] rounded-lg border border-gray-100">
      <h3>ご確認</h3>
      <ul className="pl-4 list-disc">
        <li>下記申請フォームをご入力の上、申請ボタンより申請してください。</li>
        <li>申請をした段階で「利用規約」に同意したこととします。</li>
        <li>厳正な審査の結果、チケット作成が完了いたします。</li>
        <li>審査は~2週間ほどかかります。</li>
      </ul>
    </div>
  );
};

type Input = {
  label: string;
  required: boolean;
  className: string;
  type?: string;
  autoComplete?: string;
  register: UseFormRegisterReturn;
  errorMessage?: any;
};

const TicketCreate: CustomNextPage = () => {
  const { user } = useUserStatus();
  const { createProduct, isLoading, setIsLoading } = useManageProduct();
  const { createPrice } = useManagePrice();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    async (e) => {
      setIsLoading(true);
      if (user) {
        try {
          const params: Ticket = {
            name: e.name,
            description: e.description,
            metadata: {
              organizer: user.uid,
              startTime: e.startTime ?? null,
              startDay: e.startDay ?? null,
              location: e.location ?? null,
              postCode: e.postCode ?? null,
              lat: e.lat ?? null,
              lng: e.lng ?? null,
            },
            images: [e.image],
            active: true,
            taxCode: null,
            role: null,
          };

          const { id } = await createProduct(params);

          await createPrice({
            product: id,
            currency: "jpy",
            unit_amount: e.price,
          });

          window.alert("Sucess!!");
        } catch (e: any) {
          window.alert(e.message);
        }
      }

      setIsLoading(false);
      return;
    },
    [user, createProduct, createPrice, setIsLoading]
  );

  const InputList: Input[] = [
    {
      label: "画像",
      required: false,

      className:
        "py-1 px-3 w-full text-base leading-8 rounded border border-gray focus:border-blue-400 focus:ring-2 transition-colors duration-200 ease-in-out",
      register: register("image"),
      type: "file",
      errorMessage: errors?.name?.message,
    },
    {
      label: "チケット名",
      required: true,
      className:
        "py-1 px-3 w-full text-base leading-8 rounded border border-gray focus:border-blue-400 focus:ring-2 transition-colors duration-200 ease-in-out",
      type: "text",
      autoComplete: "name",
      register: register("name", {
        required: { value: true, message: "" },
        maxLength: {
          value: 30,
          message: "文字数オーバーです。",
        },
      }),
      errorMessage: errors?.name?.message,
    },
    {
      label: "内容",
      required: true,
      className:
        "block mt-1 w-full rounded-md border border-gray focus:border-blue-400 focus:ring-blue-400 shadow-sm sm:text-sm",
      type: "text",
      autoComplete: "text",
      register: register("description", {
        required: { value: true, message: "" },
      }),
      errorMessage: errors?.description?.message,
    },
    {
      label: "料金",
      required: true,
      className:
        "py-1 px-3 w-full text-base leading-8 rounded border border-gray focus:border-blue-400 focus:ring-2 transition-colors duration-200 ease-in-out",
      type: "number",
      register: register("price", {
        required: { value: true, message: "" },
        min: {
          value: 100,
          message: "100円から入力できます。",
        },
        max: {
          value: 10000000,
          message: "10,000,000円まで入力できます。",
        },
      }),
      errorMessage: errors?.price?.message,
    },
    {
      label: "開催日",
      required: true,
      className:
        "py-1 px-3 w-full text-base leading-8 rounded border border-gray focus:border-blue-400 focus:ring-2 transition-colors duration-200 ease-in-out",
      type: "date",
      register: register("startDay", {
        required: { value: true, message: "" },
      }),
      errorMessage: errors?.startDay?.message,
    },
    {
      label: "郵便番号",
      required: false,

      className:
        "py-1 px-3 w-full text-base leading-8 rounded border border-gray focus:border-blue-400 focus:ring-2 transition-colors duration-200 ease-in-out",
      register: register("postCode"),
      type: "text",
      autoComplete: "postal-code",
      errorMessage: errors?.postCode?.message,
    },
  ];

  if (isLoading) return <Loading text={"作成中..."} />;

  return (
    <div>
      {user && (
        <div className="py-14 px-5 mx-auto max-w-[700px] md:p-0">
          <div className="space-y-5">
            <h3 className="text-2xl font-bold leading-6 text-center">
              チケット新規作成
            </h3>
            <Atention />
            <form onSubmit={handleSubmit(onSubmit)}>
              {InputList.map((data) => {
                return (
                  <Input
                    key={data.label}
                    label={data.label}
                    required={data.required}
                    errorMessage={data.errorMessage}
                    className={data.className}
                    register={data.register}
                    type={data.type ?? undefined}
                    autoComplete={data.autoComplete ?? undefined}
                  />
                );
              })}

              <Map register={register} />

              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 mt-5 text-sm font-medium text-white hover:text-blue-400 bg-blue-400 hover:bg-white rounded-md hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 shadow-sm"
              >
                チケット作成を申請する
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

TicketCreate.getLayout = Layout;

export default TicketCreate;
