/**
 * @package
 */
import Link from "next/link";

const items = [
  {
    id: "1",
    name: "first",
  },
  {
    id: "2",
    name: "second",
  },
  {
    id: "3",
    name: "third",
  },
];

export const List = () => {
  return (
    <ul className="bg-white divide-y md:w-[700px]">
      {items.map((item) => {
        return (
          <li
            key={item.id}
            className="flex justify-between items-center px-10 h-20"
          >
            <h2 className="text-3xl font-bold text-gray-600">{item.name}</h2>
            <Link href="/detail">
              <a className="text-blue-400">詳細</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
