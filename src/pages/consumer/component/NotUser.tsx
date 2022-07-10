import Link from "next/link";

export const NotUser = () => {
  return (
    <div className="text-center">
      <h2>こちらは会員限定の機能になります。</h2>
      <Link href={"/consumer"} passHref>
        <a className="py-2 px-4 text-sm text-white bg-blue-300 hover:bg-blue-200 rounded-full">
          ログイン / 新規作成
        </a>
      </Link>
    </div>
  );
};
