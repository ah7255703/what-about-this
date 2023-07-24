import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@ui/components/DropDown";
import NotiCard from "@ui/components/NotificationCard";
import useInView from "@ui/hooks/useInView";
import MainLayout from "@ui/layouts/main";
import React, { ReactNode } from "react";
import { BiMenu } from "react-icons/bi";
import cn from "utils/cn";

function NotiGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="w-full mb-2">
        <h2 className="text-lg font-medium text-slate-700">
          {label}
          <span className="text-[0.6em] mx-0.5">(30)</span>
        </h2>
      </div>
      <div className="flex items-start ms-2 flex-col gap-3">{children}</div>
    </div>
  );
}

function Page() {
  const [isInView, _elRef] = useInView();
  console.log(isInView);

  return (
    <MainLayout>
      <div className="w-full max-h-full overflow-auto">
        <div ref={_elRef} />
        <div className="p-4 pb-10 max-w-xl w-full mx-auto">
          <div
            className={cn(
              "flex items-center bg-white p-5 justify-between gap-2 mb-2 transition-all ease-in-out",
              !isInView && "sticky top-2 rounded-2xl backdrop-blur-[2px] bg-opacity-80"
            )}
          >
            <h2 className="text-2xl font-medium text-slate-900">
              Notifications
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BiMenu size={30} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuItem>Mark all as read</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex w-full flex-col p-5 items-start gap-4">
            <NotiGroup label="fuck me">
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
            </NotiGroup>
            <NotiGroup label="fuck me">
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
              <NotiCard />
            </NotiGroup>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Page;
