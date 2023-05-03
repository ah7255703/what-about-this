import React, { type HTMLAttributes } from "react";

export default function MainLayout(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{props.children}</div>;
}
