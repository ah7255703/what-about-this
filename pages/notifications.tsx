import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "components/DropDown";
import NotiCard from "components/NotificationCard";
import MainLayout from "layouts/main";
import React, { ReactNode } from "react";
import { BiMenu } from "react-icons/bi";

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
        <h2 className="text-lg font-medium text-slate-700">{label}<span className="text-[0.6em] mx-0.5">(30)</span></h2>
      </div>
      <div className="flex items-start ms-2 flex-col gap-3">{children}</div>
    </div>
  );
}

function Page() {
  return (
    <MainLayout>
      <div className="p-4 pb-10 max-w-xl max-h-full overflow-auto w-full mx-auto">
        <div className="flex items-center bg-white p-5 justify-between gap-2 mb-2">
          <h2 className="text-2xl font-medium text-slate-900">Notifications</h2>
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
        <div className="flex w-full p-5 flex-col items-start max-h-full gap-4 overflow-auto">
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
    </MainLayout>
  );
}

export default Page;
