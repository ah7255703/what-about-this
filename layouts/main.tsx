import NavLink from "components/NavLink";
import React, { type HTMLAttributes } from "react";
import {
  BiHome,
  BiNotification,
  BiSearch,
  BiSupport,
  BiUser,
} from "react-icons/bi";
import WAvatar from "components/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/DropDown";
import { BiLogOut } from "react-icons/bi";

function Header() {
  return (
    <header className="w-full h-fit py-2 px-4 flex items-center justify-between border-b-2 border-slate-100 bg-white">
      <div className="group">
        <div className="logo">
          <div className="text-2xl font-semibold text-orange-400">WAT</div>
        </div>
      </div>
      <nav>
        <div className="flex flex-row items-center justify-between gap-2">
          <NavLink label="Home" icon={<BiHome />} href={"/"} />
          <NavLink
            label="Notifications"
            icon={<BiNotification />}
            href={"/notifications"}
          />
          <NavLink label="Profile" icon={<BiUser />} href={"/me"} />
        </div>
      </nav>
      <div className="flex flex-row items-center gap-3">
        <button className="text-slate-500 text-3xl">
          <BiSearch />
        </button>
        <div className="avatar">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <WAvatar fallback="AH" size="md" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] mt-3.5">
              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-2 text-lg">
                  <BiSupport />
                  <span>support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-lg text-red-500">
                  <BiLogOut />
                  <span>logout</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default function MainLayout({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-start bg-slate-50">
      <Header />
      <main className="flex-1 w-full overflow-hidden">
        <div className="h-full max-h-full overflow-hidden">{children}</div>
      </main>
    </div>
  );
}
