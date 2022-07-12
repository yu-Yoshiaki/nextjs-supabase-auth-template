type Props = {
  priceid: string;
  unitAmount?: number;
};
export const CheckoutSession = (props: Props) => {
  //Checkout Session用
  ///一時的なもの。本番はStripe Elementsを使用予定。

  return (
    <div className="flex flex-col p-10 w-full text-center bg-white rounded-md border border-gray-200 shadow-md">
      <div className="mb-4">
        <p className={`text-2xl font-semibold`}>{props.unitAmount}円</p>
      </div>

      <form action={`/api/payment/checkout/${props.priceid}`} method="POST">
        <input
          type="submit"
          value={"注文をする"}
          className="p-3 text-center text-white bg-blue-300 rounded-full hover:shadow-none"
        />
      </form>
    </div>
  );
};
