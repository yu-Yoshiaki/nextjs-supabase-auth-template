import type { VFC } from "react";
import { useManageProduct } from "src/hook/product/useManageProduct";

type ProductDelete = {
  productId: string;
};
export const ProductDelete: VFC<ProductDelete> = (props) => {
  const { updateProduct } = useManageProduct();
  const handleClick = async () => {
    await updateProduct(props.productId, { active: false });
  };

  return (
    <button onClick={handleClick} className="text-red-500">
      削除
    </button>
  );
};
