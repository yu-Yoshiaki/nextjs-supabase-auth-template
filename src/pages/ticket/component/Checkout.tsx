/* eslint-disable react/jsx-handler-names */
/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from "next/router";
import type { Data } from "src/pages/index.page";
import type { definitions } from "src/type/supabase";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import type { CartActions, CartDetails } from "use-shopping-cart/core";

type UseShoppingCart = {
  addItem: CartActions["addItem"];
  cartDetails: CartDetails;
};

type Props = {
  priceData: Array<definitions["prices"]>;
  productData: Data[];
};

export const Checkout = (props: Props) => {
  const router = useRouter();
  const { addItem } = useShoppingCart<UseShoppingCart>();

  const formatData = formatCurrencyString({
    value: props.priceData[0].unit_amount as number,
    currency: "JPY",
  });

  const product = {
    name: props.productData[0].name as string,
    description: props.productData[0].description as string,
    id: props.productData[0].id,
    price_id: props.priceData[0].id,
    price: props.priceData[0].unit_amount as number,
    currency: "JPY",
    image: props.productData[0].image as string,
  };

  const handleAddItem = () => {
    addItem(product);
    setTimeout(() => {
      router.push("/ticket/checkout/edit");
    }, 1000);
  };

  return (
    <div className="flex flex-col p-10 w-full text-center bg-white rounded-md border border-gray-200 shadow-xl">
      <div className="mb-4">
        <p className={`text-2xl font-semibold`}>{formatData}円</p>
      </div>

      <button
        onClick={handleAddItem}
        className="p-3 text-center text-white bg-blue-300 rounded-full hover:shadow-none"
      >
        注文をする
      </button>
    </div>
  );
};
