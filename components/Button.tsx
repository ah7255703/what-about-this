import { ButtonHTMLAttributes, PropsWithoutRef, forwardRef } from "react";
import { cva, type VariantProps } from "cva";
import { filterObject } from "utils/filter-object";
import cn from "utils/cn";

const ButtonVariants = cva("leading-snug font-medium whitespace-nowrap h-fit w-fit active:scale-[0.98] active:bg-opacity-90 transition-all", {
  variants: {
    intent:{
      primary:"bg-slate-700 text-white/90 px-2 py-1 rounded-md"
    },
    size: {
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
      '2xl': "text-2xl",
    },
    fluid: {
      true: "w-full",
    },
  },
  defaultVariants:{
    size:"lg"
  }
});

type VType = VariantProps<typeof ButtonVariants>;

type Props = PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & VType;

const Button = forwardRef<HTMLButtonElement, Props>((props, _ref) => {
  const Variant = filterObject(props, ["intent", "fluid","size"]);

  return (
    <button
      {...props}
      role="button"
      ref={_ref}
      className={cn(ButtonVariants(Variant), props.className)}
    />
  );
});

export default Button;
