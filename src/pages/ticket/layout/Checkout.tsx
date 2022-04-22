import type { VFC } from "react";
import { useStripeCheckout } from "src/hook/useStripeCheckout";
import type { ReadPrice } from "src/type/ticket";

export const Checkout: VFC<{
  name: string;
  amount: ReadPrice["unitAmount"];
  priceId: ReadPrice["id"];
}> = (props) => {
  const { createCheckoutSession } = useStripeCheckout();
  const handleSubmit = async () => {
    await createCheckoutSession({
      lineItems: [{ price: props.priceId, quantity: 1 }],
    });
  };
  return (
    <div className="pb-5 border border-gray">
      <p className="p-2 mb-5 w-full text-left bg-skyblue">配信</p>
      <h3 className="px-3 mb-10 text-xl font-bold text-left">{props.name}</h3>
      <div className="flex justify-between mr-1 mb-16 ml-3">
        <p className="py-1 px-2 w-[60px] text-sm bg-pink rounded-full ">
          販売中
        </p>
        <p className="text-2xl font-bold text-right">
          {props.amount}円<span className="text-sm">（税込）</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <button
          type="submit"
          role="link"
          className={
            "flex justify-center items-center py-4 px-20  text-white bg-blue"
          }
        >
          チケット購入
        </button>
      </form>
    </div>
  );
};
