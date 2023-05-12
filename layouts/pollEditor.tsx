import React, { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import MainLayout from "./main";
import Input from "components/Input";
import Button from "components/Button";
import { BiImageAdd } from "react-icons/bi";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "utils/cn";

const NavLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<typeof Link>
>(({ children, className, ...props }, _ref) => {
  const { asPath } = useRouter();

  return (
    <Link
      ref={_ref}
      className={cn(
        "px-4 py-1 hover:bg-slate-500 text-slate-900 text-start transition-all bg-slate-200 hover:text-white text-lg font-normal rounded-lg",
        props.href === asPath && "font-medium bg-slate-600 text-white",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
});
NavLink.displayName = "NavLink";

export default function PollEditorLayout({
  children,
  ...props
}: {
  children: ReactNode;
}) {
  const { query } = useRouter();
  const link = `/poll/${query.pid}`;
  return (
    <MainLayout>
      <div className="container max-w-screen-lg p-4 overflow-auto max-h-full">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Question?"
              inputClassName="p-2 pe-10 font-medium text-sm"
              dir="auto"
            />
          </div>
          <Button className="px-3" intent="outline">
            <BiImageAdd size={27} />
          </Button>
          <Button className="px-3">Save</Button>
        </div>
        <div className="block my-3 w-full h-px bg-black/20" />
        <div className="w-full flex sm:flex-row flex-col items-start justify-center gap-2">
          <aside className="py-5 sm:pb-10 max-w-full sm:w-1/4 sm:border-e border-e-black/50 w-full">
            <nav className="flex flex-col gap-2 px-3">
              <NavLink href={link}>Main</NavLink>
              <NavLink href={link + "/settings"}>Settings</NavLink>
              <NavLink href={link + "/stats"}>Stats</NavLink>
            </nav>
          </aside>
          <main className="flex-1 pt-5 w-full sm:w-auto">{children}</main>
        </div>
      </div>
    </MainLayout>
  );
}
