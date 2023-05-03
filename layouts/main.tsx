import React, { type HTMLAttributes } from "react";

export default function MainLayout(props: HTMLAttributes<HTMLDivElement>) {
  return <>{props.children}</>;
}
