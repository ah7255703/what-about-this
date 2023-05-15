import React, { ReactNode } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import cn from "utils/cn";

const WAvatar = ({
  size = "sm",
  src = "",
  fallback,
  className,
}: {
  size?: "sm" | "md" | "lg"| "xl";
  src?: string;
  fallback: ReactNode;
  className?: string | undefined;
}) => (
  <Avatar.Root
    className={cn(
      "bg-blackA3 inline-flex h-[35px] w-[35px] aspect-square select-none items-center justify-center overflow-hidden rounded-full align-middle",
      size === "md" && "h-[45px] w-[45px]",
      size === "lg" && "h-[60px] w-[60px]",
      size === "xl" && "h-[120px] w-[120px]",
      className
    )}
  >
    <Avatar.Image
      className="h-full w-full rounded-[inherit] object-cover"
      src={src}
      alt="Pedro Duarte"
    />
    <Avatar.Fallback
      className="text-orange-600 font-semibold leading-1 flex h-full w-full items-center justify-center bg-slate-100 text-sm"
      delayMs={600}
    >
      {fallback}
    </Avatar.Fallback>
  </Avatar.Root>
);

export default WAvatar;
