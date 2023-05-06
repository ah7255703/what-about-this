import React, { InputHTMLAttributes, ReactNode, useId } from "react";
import { forwardRef } from "react";
import { FaExclamation } from "react-icons/fa";
import cn from "utils/cn";
const Input = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "ref"> & {
    labelClassName?: string;
    inputClassName?: string;
    label?: string;
    error?: string;
    variant?: "filled" | "";
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
  }
>(
  (
    {
      inputClassName,
      variant,
      rightIcon,
      leftIcon,
      error,
      className,
      labelClassName,
      label,
      ...props
    },
    _ref
  ) => {
    const _id = useId();

    return (
      <div className={cn("relative", className)}>
        {label && (
          <label
            htmlFor={_id}
            className={cn(
              "text-sm text-slate-400 font-medium",
              "mb-1.5 leading-snug",
              "peer-focus:text-slate-500 select-none",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="w-full">
          <input
            {...props}
            className={cn(
              "peer block min-h-[auto] w-full rounded-lg outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-red-950 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0",
              "bg-transparent border-[0.5px] border-slate-300",
              "p-2 leading-snug text-sm",
              "focus:border-slate-400",
              inputClassName
            )}
            id={_id}
            ref={_ref}
          />
          {error && (
            <span className="text-red-400 text-xs font-thin flex items-center justify-start gap-1 mt-1 ms-1">
              <FaExclamation />
              <span>{error}</span>
            </span>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;
