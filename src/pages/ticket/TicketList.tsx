import type { Ticket } from "src/type/ticket";

import { CardLayout } from "./CardLayout";

// const products = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc: "/bread.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc: "/mobile.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 3,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc: "/mobile.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 4,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc: "/mobile.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 5,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc: "/mobile.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 6,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc: "/mobile.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 7,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc: "/mobile.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 8,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc: "/mobile.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 9,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc: "/mobile.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 10,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc: "/mobile.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 11,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc: "/mobile.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
// ];

export const TicketList = (props: { data: Ticket[] }) => {
  return (
    <div className="py-4 px-4 ">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {props.data.map((ticket) => {
          return <CardLayout ticket={ticket} key={ticket.id} />;
        })}
      </div>
    </div>
  );
};
