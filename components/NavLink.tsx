import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useRef,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "utils/cn";

const NavLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<typeof Link> & { icon: ReactNode; label: string }
>(({ className, icon, label, ...props }, _ref) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const { pathname} = useRouter();
  const active = pathname === props.href;
  return (
    <Link
      {...props}
      aria-label={label}
      className={cn(
        "rounded-md flex flex-col items-center text-lg justify-center relative px-4 py-1.5 text-slate-900",
        "after:w-0 after:h-[2px] after:bg-slate-300 after:absolute after:left-0 after:-bottom-2 after:rounded-full after:transition-all",
        active && "bg-slate-100 text-slate-950 font-medium after:w-full",
        !active && "hover:bg-slate-200",
        className
      )}
      ref={ref}
    >
      <span className="text-xl">{icon}</span>
      <span className="sm:inline hidden text-lg">{label}</span>
    </Link>
  );
});

NavLink.displayName = "NavLink";

export default NavLink;
