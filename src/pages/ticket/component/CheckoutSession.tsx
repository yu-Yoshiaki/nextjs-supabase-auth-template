type Props = {
  priceid: string;
};
export const CheckoutSession = (props: Props) => {
  //Checkout Session用
  ///一時的なもの。本番はStripe Elementsを使用予定。

  return (
    <form action={`/api/payment/checkout/${props.priceid}`} method="POST">
      <input type="submit" value={"Checkout"} />
    </form>
  );
};
