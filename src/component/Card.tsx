import Link from "next/link";
import type { ReactChild, VFC } from "react";

export const Card: VFC<{ href: string; children: ReactChild }> = (props) => {
  return (
    <div className="w-full max-w-[400px] rounded-md">
      <Link href={props.href}>
        <a>{props.children}</a>
      </Link>
    </div>
  );
};
