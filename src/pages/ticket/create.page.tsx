import { GoogleMap, LoadScript } from "@react-google-maps/api";
import type { CustomNextPage } from "next";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "src/hook/useAuth";
import { useStripeProducts } from "src/hook/useStripeProducts";
import { Layout } from "src/layout";

const TicketCreate: CustomNextPage = () => {
  const { user } = useAuth();
  const [isLoding, setIsLoding] = useState(false);
  const { createPrice, createProduct } = useStripeProducts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serchAddress, setSerchAddress] = useState("");
  const defaultMapData = {
    center: {
      lat: 35.69575,
      lng: 139.77521,
    },
    zoom: 9,
  };
  const [mapData, setMapData] = useState(defaultMapData);

  const handleGenerateGeocode = () => {
    if (typeof window != "undefined") {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: serchAddress }, (result, status) => {
        if (status == "OK" && result) {
          const lat = result[0].geometry.location.lat();
          const lng = result[0].geometry.location.lng();

          setMapData({
            center: {
              lat,
              lng,
            },
            zoom: 15,
          });
        }
      });
    }
  };

  const handleChange = (e: any) => {
    setSerchAddress(e.target.value);
  };

  const onSubmit = useCallback(
    async (e) => {
      setIsLoding(true);
      if (user) {
        try {
          const stripeProduct = await createProduct({
            name: e.name,
            description: e.description,
            metadata: {
              organizer: user,
              // startDay: e.metadata.startDay ?? undefined,
              // address: e.metadata.address ?? undefined,
              // postCode: e.metadata.postCode ?? undefined,
              // lat: mapData.center.lat ?? undefined,
              // lng: mapData.center.lng ?? undefined,
            },
            images: [],
            active: true,
            taxCode: null,
            role: null,
          });

          await createPrice({
            product: stripeProduct.id,
            currency: "jpy",
            unit_amount: e.price,
          });

          window.alert("Sucess!!");
        } catch (e: any) {
          window.alert(e.message);
        }
      }

      setIsLoding(false);
      return;
    },
    [user, createPrice, createProduct]
  );

  return (
    <div>
      {isLoding && <div className="w-full h-full opacity-10">作成中。。。</div>}

      {user && (
        <div className="justify-center md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <h3 className="text-lg font-medium leading-6">チケット新規作成</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="py-5 px-4 space-y-6 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <div className="flex space-x-4">
                        <label>
                          チケット名 <span className="">必須</span>
                        </label>
                        <p className="">{errors?.name?.message}</p>{" "}
                      </div>
                      <input
                        className="py-1 px-3 w-full text-base leading-8 rounded border border-gray focus:border-blue focus:ring-2 transition-colors duration-200 ease-in-out"
                        {...register("name", {
                          required: { value: true, message: "" },
                          maxLength: {
                            value: 30,
                            message: "文字数オーバーです。",
                          },
                        })}
                        type="text"
                        autoComplete="name"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <div className="flex space-x-4">
                        <label>
                          内容 <span className="">必須</span>
                        </label>
                        <p className="">{errors?.description?.message}</p>{" "}
                      </div>
                      <textarea
                        {...register("description", {
                          required: { value: true, message: "" },
                        })}
                        autoComplete="text"
                        className="block mt-1 w-full rounded-md border border-gray focus:border-blue focus:ring-blue shadow-sm sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <div className="flex space-x-4">
                        <label>
                          金額 <span className="">必須</span>
                        </label>
                        <p className="">{errors?.price?.message}</p>
                      </div>
                      <input
                        {...register("price", {
                          required: { value: true, message: "" },
                          min: {
                            value: 100,
                            message: "100円から入力できます。",
                          },
                          max: {
                            value: 10000000,
                            message: "10,000,000円まで入力できます。",
                          },
                        })}
                        className="py-1 px-3 w-full text-base leading-8 rounded border border-gray focus:border-blue focus:ring-2 transition-colors duration-200 ease-in-out"
                      />
                    </div>

                    {/* <div className="col-span-6 sm:col-span-4">
                      <div className="flex space-x-4">
                        <label>
                          販売数 <span className="">必須</span>
                        </label>
                        <p className="">{errors?.stock?.message}</p>
                      </div>
                      <input
                        {...register("stock", {
                          required: { value: true, message: "" },
                        })}
                        type="number"
                        className="block mt-1 w-full rounded-md focus:border-blue focus:ring-blue shadow-sm sm:text-sm"
                      />
                    </div> */}

                    <div className="col-span-6">
                      <div className="flex space-x-4">
                        <label>
                          開催日 <span className="">必須</span>
                        </label>
                        <p className="">{errors?.start?.message}</p>{" "}
                      </div>
                      <input
                        {...register("startDay", {
                          required: { value: true, message: "" },
                        })}
                        className="py-1 px-3 w-full text-base leading-8 rounded border border-gray focus:border-blue focus:ring-2 transition-colors duration-200 ease-in-out"
                        type="date"
                      />
                    </div>

                    <div className="col-span-6 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        郵便番号
                      </label>
                      <input
                        {...register("postCode")}
                        className="py-1 px-3 w-full text-base leading-8 rounded border border-gray focus:border-blue focus:ring-2 transition-colors duration-200 ease-in-out"
                        type="text"
                        autoComplete="postal-code"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium ">
                        開催場所
                      </label>
                      <div className="flex mb-1 space-x-1">
                        <input
                          {...register("address")}
                          className="py-1 px-3 w-full text-base leading-8 rounded border focus:border-blue focus:ring-2 transition-colors duration-200 ease-in-out"
                          type="text"
                          onChange={handleChange}
                        />

                        <button
                          type="button"
                          onClick={handleGenerateGeocode}
                          className="p-1 whitespace-nowrap border"
                        >
                          住所検索
                        </button>
                      </div>

                      <LoadScript
                        googleMapsApiKey={
                          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string
                        }
                      >
                        <GoogleMap
                          mapContainerStyle={{
                            width: "100%",
                            height: "400px",
                          }}
                          center={mapData.center}
                          zoom={mapData.zoom}
                        ></GoogleMap>
                      </LoadScript>
                    </div>
                  </div>
                </div>
                <div className="py-3 px-4 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 text-sm font-medium hover:bg-blue rounded-md border focus:ring-2 focus:ring-blue focus:ring-offset-2 shadow-sm"
                  >
                    Stripe登録
                  </button>
                </div>
              </div>
            </form>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 text-sm font-medium hover:bg-blue rounded-md border focus:ring-2 focus:ring-blue focus:ring-offset-2 shadow-sm"
            >
              Firebase登録
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

TicketCreate.getLayout = Layout;

export default TicketCreate;
