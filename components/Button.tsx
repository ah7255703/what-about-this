import React from "react";
import { ButtonHTMLAttributes, PropsWithoutRef, forwardRef } from "react";
import { cva, type VariantProps } from "cva";
import { filterObject } from "utils/filter-object";
import cn from "utils/cn";

const ButtonVariants = cva(
  "px-2 py-1 rounded-md leading-snug font-medium relative whitespace-nowrap h-fit w-fit active:scale-[0.98] active:bg-opacity-90 transition-all",
  {
    variants: {
      intent: {
        primary: "bg-slate-700 text-white/90 disabled:bg-slate-200",
        danger: "bg-red-transparent text-red-500 hover:text-red-600 border-[0.5px] border-red-500",
        outline:"bg-transparent text-slate-700 border-[0.5px] border-slate-500 shadow shadow-inner"
      },
      size: {
        sm: "text-sm",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
      },
      fluid: {
        true: "w-full",
      },
      circle:{
        true:"rounded-full"
      }
    },
    defaultVariants: {
      size: "lg",
      intent: "primary",
    },
  }
);

type VType = VariantProps<typeof ButtonVariants>;

type Props = PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> &
  VType & { loading?: boolean };

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, loading, ...props }, _ref) => {
    const Variant = filterObject(props, ["intent", "fluid", "size","circle"]);

    return (
      <button
        {...props}
        role="button"
        ref={_ref}
        className={cn(
          ButtonVariants(Variant),
          className,
          loading && ["animate-pulse"]
        )}
      />
    );
  }
);
Button.displayName = "Button";
export default Button;
