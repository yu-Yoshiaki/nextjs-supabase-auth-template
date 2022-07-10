import type { ReactNode } from "react";

export const Container = (props: { children: ReactNode }) => {
  return <div className="container px-5 mx-auto">{props.children}</div>;
};
