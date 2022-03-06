import axios from "axios";
import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetchTicket } from "src/hook/useFetchTicket";
import { useUser } from "src/hook/useUser";
import { FixedLayout } from "src/layout";
// type TicketData = {
//   name: string;
//   description: string;
//   image?: string;
//   organizer: string;
//   stock: number;
//   start: object;
//   isAccept: boolean;
//   priceList: {
//     nomal: {
//       price: string;
//       content: string;
//     };
//   };
//   address: {
//     address: string;
//     postCode: string;
//   };
// };

const TicketCreate: CustomNextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { createDoc } = useFetchTicket();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    !user && router.push("/auth/login");
  }, [router, user]);

  const onSubmit = useCallback(
    async (e) => {
      if (user) {
        const createProduct = async () => {
          try {
            const res = await axios.post("/api/createProduct", {
              productName: e.name,
              owner: user.uid,
              unitAmount: e.price,
            });
            const result = await res.data;
            return result;
          } catch (error) {
            return error;
          }
        };

        const stripePriceId = await createProduct();
        if (stripePriceId) {
          const Data = {
            name: e.name,
            description: e.description,
            organizer: user?.uid,
            stock: e.stock,
            start: e.start,
            isAccept: true,
            priceList: {
              nomal: {
                price: e.price,
                content: "",
              },
            },
            address: {
              address: e.address,
              postCode: e.postCode,
            },
            stripePriceId,
          };
          createDoc(Data);
        }
      }
      return;
    },
    [createDoc, user]
  );

  return (
    <div>
      {user && (
        <div className="justify-center md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">チケット新規作成</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="py-5 px-4 space-y-6 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <div className="flex space-x-4">
                        <label>
                          チケット名 <span className="text-red-600">必須</span>
                        </label>
                        <p className="text-red-500">{errors?.name?.message}</p>{" "}
                      </div>
                      <input
                        className="py-1 px-3 w-full text-base leading-8 text-gray-700 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 ease-in-out outline-none"
                        {...register("name", {
                          required: { value: true, message: "" },
                          maxLength: { value: 30, message: "文字数オーバーです。" },
                        })}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <div className="flex space-x-4">
                        <label>
                          内容 <span className="text-red-600">必須</span>
                        </label>
                        <p className="text-red-500">{errors?.description?.message}</p>{" "}
                      </div>
                      <textarea
                        {...register("description", {
                          required: { value: true, message: "" },
                        })}
                        autoComplete="text"
                        className="block mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <div className="flex space-x-4">
                        <label>
                          金額 <span className="text-red-600">必須</span>
                        </label>
                        <p className="text-red-500">{errors?.price?.message}</p>
                      </div>
                      <input
                        {...register("price", {
                          required: { value: true, message: "" },
                          min: { value: 100, message: "100円から入力できます。" },
                          max: { value: 10000000, message: "10,000,000円まで入力できます。" },
                        })}
                        className="block mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <div className="flex space-x-4">
                        <label>
                          販売数 <span className="text-red-600">必須</span>
                        </label>
                        <p className="text-red-500">{errors?.stock?.message}</p>
                      </div>
                      <input
                        {...register("stock", {
                          required: { value: true, message: "" },
                        })}
                        type="number"
                        className="block mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6">
                      <div className="flex space-x-4">
                        <label>
                          開催日 <span className="text-red-600">必須</span>
                        </label>
                        <p className="text-red-500">{errors?.start?.message}</p>{" "}
                      </div>
                      <input
                        {...register("start", {
                          required: { value: true, message: "" },
                        })}
                        className="block mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">郵便番号</label>
                      <input
                        {...register("postCode")}
                        autoComplete="postal-code"
                        className="block mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">住所</label>
                      <input
                        {...register("address")}
                        className="block mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="py-3 px-4 text-right bg-gray-50 sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
                  >
                    新規作成
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

TicketCreate.getLayout = FixedLayout;

export default TicketCreate;
