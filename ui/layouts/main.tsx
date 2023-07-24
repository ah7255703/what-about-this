import NavLink from "@ui/components/NavLink";
import React, { useState, type HTMLAttributes } from "react";
import {
  BiHome,
  BiNotification,
  BiSearch,
  BiSupport,
  BiUser,
  BiEdit,
} from "react-icons/bi";
import WAvatar from "@ui/components/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/DropDown";
import { BiLogOut } from "react-icons/bi";
import Button from "@ui/components/Button";
import Portal from "@ui/components/Portal";
import Input from "@ui/components/Input";
import Link from "next/link";
import { GiBigGear } from "react-icons/gi";


function Header() {
  const [searchBox, setSearchBox] = useState(false);
  const toggleSearch = () => setSearchBox(!searchBox);

  return (
    <>
      {searchBox && (
        <Portal>
          <div className="fixed inset-0 z-[150]">
            <div  className="fixed inset-0 bg-black/20 z-[140] backdrop-blur-sm blur-[2px]" />
            <div onClick={toggleSearch} className="inset-0 fixed flex items-center pt-5 z-[150] justify-center p-10 overflow-auto">
              <div className="max-w-lg min-h-[350px] w-10/12 bg-slate-50 h-fit max-h-full rounded-lg flex flex-col items-center gap-1">
                <div className="w-full border-b p-1">
                  <Input
                    isize="xl"
                    placeholder="search..."
                    inputClassName="border-none text-xl"
                  />
                </div>
                <div className="flex-1 max-h-full overflow-hidden w-full">
                  <div className="h-full overflow-auto p-2">
                    <div className="users flex items-start flex-col w-full gap-2">
                      <h2 className="text-lg">Users</h2>
                      <div className="flex p-2 hover:bg-slate-200 rounded-lg transition flex-col w-full">
                        <Link href='' className="flex items-center gap-2">
                          <WAvatar fallback="AH"/>
                          <span>Ahmad Hassan</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}

      <header className="w-full h-fit py-2 px-4 flex items-center justify-between border-b-2 border-slate-100 bg-white">
        <div className="group">
          <div className="logo">
            <div className="text-2xl font-semibold text-orange-400">WAT</div>
          </div>
        </div>
        <nav>
          <div className="flex flex-row items-center justify-between gap-2">
            <NavLink label="Home" icon={<BiHome />} href={"/"} />
            <NavLink label="Settings" icon={<GiBigGear />} href={"/settings"} />
            <NavLink
              label="Notifications"
              icon={<BiNotification />}
              href={"/notifications"}
            />
            <NavLink label="Profile" icon={<BiUser />} href={"/me"} />
          </div>
        </nav>
        <div className="flex flex-row items-center gap-3">
          <button onClick={toggleSearch} className="text-slate-500 text-3xl">
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
    </>
  );
}

export default function MainLayout({
  children,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-start bg-slate-50">
      <Header />
      <main className="flex-1 w-full overflow-hidden relative">
        <Button
          intent="primary"
          size="2xl"
          className="p-3 absolute bottom-3 text-slate-400 left-3 z-50"
          circle
        >
          <BiEdit size={30} />
        </Button>
        <div className="h-full max-h-full overflow-hidden">{children}</div>
      </main>
    </div>
  );
}
