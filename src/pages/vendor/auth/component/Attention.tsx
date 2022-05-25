import type { VFC } from "react";

export const Attention: VFC = () => {
  return (
    <div className="p-8 w-full max-w-[700px] rounded-lg border border-gray">
      <h3>ご確認</h3>
      <ul className="px-10 list-disc text-left">
        <li>下記は、日本の法律で情報の提供が義務付けられているものです。</li>
        <li>全て入力の上、申請してください。</li>
        <li>申請をした段階で「利用規約」に同意したこととします。</li>
        <li>
          厳正な審査の後、受理された場合にアカウントが利用可能になります。
        </li>
        <li>審査は~2週間ほどかかります。</li>
      </ul>
    </div>
  );
};
