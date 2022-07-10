import type { CustomNextPage } from "next";
// import { useUser } from "src/hook/useUser";
import { Layout } from "src/layout";
import { Side } from "src/pages/ticket/checkout/Side";
import { ElementForm } from "src/pages/ticket/component/ElementForm";
import { ElementProvider } from "src/pages/ticket/component/ElementProvider";
import { useShoppingCart } from "use-shopping-cart";

const Index: CustomNextPage = () => {
  // const { user } = useUser();
  const { totalPrice } = useShoppingCart();

  return (
    <div className="grid grid-cols-5 gap-x-4 py-6 mx-auto w-[900px]">
      <div className="col-span-3 p-10 bg-white rounded-lg">
        <div>
          <div>アカウントをお持ちの方</div>
          <div>ログイン</div>
        </div>

        <div>
          <div>アカウントをお持ちでない方</div>
          {totalPrice && (
            <ElementProvider amount={totalPrice}>
              <ElementForm />
            </ElementProvider>
          )}
        </div>
      </div>

      <div className="col-span-2">
        <Side />
      </div>
    </div>
  );
};

Index.getLayout = Layout;

export default Index;
