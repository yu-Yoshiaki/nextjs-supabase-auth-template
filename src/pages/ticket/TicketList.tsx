import Image from "next/image";
import Link from "next/link";
import type { Ticket } from "src/type/ticket";

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
        {props.data.map((product) => {
          return (
            <div key={product.id} className="group relative min-h-[500px] bg-white shadow-lg">
              <div className="w-full rounded-md group-hover:opacity-75 ">
                <Link href={`/ticket/${product.id}`}>
                  <a>
                    <Image
                      src={"/bread.jpg"}
                      alt={""}
                      width={420}
                      height={300}
                      className="block object-cover object-center w-full h-full"
                    />
                  </a>
                </Link>
              </div>
              <div className="py-4 px-2">
                <h3 className="mb-1 text-xs tracking-widest text-gray-500 ">CATEGORY</h3>
                <h2 className="text-lg font-medium text-gray-900 ">{product.name}</h2>
                <p className="mt-1">{product.priceList.nomal.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
