/* eslint-disable react/jsx-handler-names */
import { FillImage } from "src/component/FillImage";
import { useShoppingCart } from "use-shopping-cart";

export const Side = () => {
  const { totalPrice, cartCount, cartDetails, clearCart } = useShoppingCart();

  return (
    <div className="grid gap-y-3 py-6 px-4 bg-white rounded-lg divide-y">
      <p>商品</p>
      <div>
        {Object.entries(cartDetails).map((entry) => {
          const item = entry[1] as {
            name: string;
            image: string;
          };

          return (
            <div key={entry[0]} className="space-y-4">
              <FillImage src={item.image} h={"h-[200px]"} />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      <div>
        <p>商品数 : {cartCount}</p>
        <p>合計金額 : {totalPrice}</p>
      </div>
      <div className="flex justify-center space-x-4">
        <button onClick={clearCart} className="p-4 text-red-400">
          空にする
        </button>
      </div>
    </div>
  );
};
