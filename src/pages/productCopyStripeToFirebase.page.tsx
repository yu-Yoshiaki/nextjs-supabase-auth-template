import type { CustomNextPage } from "next";
// import { useState } from "react";
// import { useFirebaseProducts } from "src/hook/useFirebaseProducts";
// import { useStripeProducts } from "src/hook/useStripeProducts";
// import { Layout } from "src/layout";
// import type { Price, Ticket } from "src/type/ticket";

// const ProductCopyStripeToFirebase: CustomNextPage = () => {
//   const { createDoc, addTicketSubCollection } = useFirebaseProducts();
//   const { retrieveProduct, retrievePrice } = useStripeProducts();
//   const [productId, setProductId] = useState("");
//   const [priceId, setPriceId] = useState("");

//   const handleClick = async () => {
//     const data = await retrieveProduct(productId);

//     const ticket: Ticket = {
//       active: true,
//       name: data.name,
//       description: data.description as string,
//       images: data.images,
//       metadata: {
//         organizer: "xiQ8VKsbF7guEeaMMnu0fnoChhx2",
//         startDay: "2022/05/01",
//       },
//       role: null,
//       taxCode: null,
//     };

//     await createDoc(ticket, productId);
//   };

//   const handlePrice = async () => {
//     const {
//       active,
//       billing_scheme,
//       currency,
//       metadata,
//       product,
//       recurring,
//       tax_behavior,
//       tiers_mode,
//       transform_quantity,
//       type,
//       unit_amount,
//     } = await retrievePrice(priceId); //stripeから取ってくる

//     const price: Price = {
//       id: priceId,
//       active,
//       billingScheme: billing_scheme,
//       currency,
//       metadata,
//       product,
//       recurring,
//       taxBehavior: tax_behavior,
//       tiersMode: tiers_mode,
//       transformQuantity: transform_quantity,
//       type,
//       unitAmount: unit_amount,
//     };

//     await addTicketSubCollection(price, productId, priceId); //firebaseにセットする
//   };
//   const handleChange = (e: string) => {
//     setProductId(e);
//   };
//   const handleChangePrice = (e: string) => {
//     setPriceId(e);
//   };

//   return (
//     <div>
//       {" "}
//       <ul>
//         <li>stripeで商品を作成</li>
//         <li>作成した商品のIDをProduct IDフォームに入力</li>
//         <li>青色ボタンをクリック</li>
//         <li>SUCCESSウィンドウが出ればOK</li>
//       </ul>
//       <ul>
//         <li>作成した商品のPrice IDをPrice IDフォームに入力</li>
//         <li>ピンクボタンをクリック</li>
//         <li>SUCCESSウィンドウが出ればOK</li>
//       </ul>
//       <div>
//         <label htmlFor="product">Product ID</label>
//         <input
//           name="product"
//           type="text"
//           onChange={(e) => {
//             return handleChange(e.target.value);
//           }}
//           className="ring-1 ring-blue"
//         />
//         <button className="p-10 bg-pink" onClick={handleClick}>
//           Create Product
//         </button>
//       </div>
//       <div>
//         <label htmlFor="price">Price ID</label>
//         <input
//           name="price"
//           type="text"
//           onChange={(e) => {
//             return handleChangePrice(e.target.value);
//           }}
//           className="ring-1 ring-blue"
//         />

//         <button className="p-10 bg-blue" onClick={handlePrice}>
//           Create price
//         </button>
//       </div>
//     </div>
//   );
// };

// ProductCopyStripeToFirebase.getLayout = Layout;

const ProductCopyStripeToFirebase: CustomNextPage = () => {
  return <div></div>;
};
export default ProductCopyStripeToFirebase;
