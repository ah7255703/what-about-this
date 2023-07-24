import React from "react";
import { BiPencil } from "react-icons/bi";
import Image from "next/image";
import useMediaQuery from "@ui/hooks/useMediaQuery";
import useInView from "@ui/hooks/useInView";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/components/Popover";
import WAvatar from "@ui/components/Avatar";
import Button from "@ui/components/Button";
import PollListView from "@ui/components/PollListView";
import MainLayout from "@ui/layouts/main";

export default function Me() {
  const isLgScreen = useMediaQuery("(min-width: 1024px)");
  const [isAboutCardinView, _cardRef] = useInView();
  // const shouldShow = isLgScreen && !isAboutCardinView;
  const shouldShow = false;
  console.log(shouldShow);

  return (
    <MainLayout>
      <div className="max-h-full w-full overflow-auto pb-10">
        <section className="w-full h-full px-5 py-2">
          <div className="cover relative sm:max-w-screen-lg aspect-video overflow-hidden h-auto max-h-[300px] mt-2 rounded-xl container bg-slate-600 w-full mx-auto">
            <Image src={"https://picsum.photos/700/300"} fill alt="" />
            <div className="absolute top-2 left-2 overflow-hidden p-2">
              <Popover>
                <PopoverTrigger>
                  <button className="text-white text-xl">
                    <BiPencil />
                  </button>
                </PopoverTrigger>
                <PopoverContent>color or file</PopoverContent>
              </Popover>
            </div>
          </div>
          <div
            
            className="w-full flex sm:justify-between justify-center sm:flex-row flex-col items-center gap-2 container sm:max-w-screen-lg -mt-[40px] z-10 sticky px-5"
          >
            <div className="flex sm:flex-row flex-col justify-center gap-2 items-center">
              <div className="p-1 bg-slate-200 rounded-full w-fit h-fit flex-grow-0">
                <WAvatar className="w-[150px] h-[150px] " fallback="AH" />
              </div>
              <div className="flex sm:items-start flex-col justify-center h-full items-center">
                <h2 className="text-slate-900 font-semibold text-xl">
                  Ahmad Hassan
                </h2>
                <span className="text-sm font-normal text-slate-500">
                  120 followers
                </span>
              </div>
            </div>
            <div className="mt-auto mb-2">
              <Button intent={"primary"}>Follow</Button>
            </div>
          </div>
        </section>
        {shouldShow && (
          <div className="gentelShow sticky bg-white z-30 top-0 left-0 w-full">
            <div className="container">
              <div className="flex items-center gap-1 p-2">
                <WAvatar size="lg" fallback='AH'/>
                <h2>Ahmad Hassan</h2>
              </div>

            </div>
          </div>
        )}
        <section className="flex gap-3 relative lg:flex-row flex-col-reverse px-5 mt-10 items-start w-full container sm:max-w-screen-lg">
          <main className="sm:flex-1 w-full">
            <div className="lg:max-w-[500px] rounded-lg space-y-5 w-full">
              <PollListView />
              <PollListView />
              <PollListView />
              <PollListView />
            </div>
          </main>
          <aside className="lg:max-w-md w-full flex flex-col items-start">
            <div ref={_cardRef} className="p-4 pb-10 bg-white rounded-lg">
              <h2 className="text-xl font-medium text-slate-600">About me</h2>
              <p
                className="mt-1 mx-2 text-sm font-normal text-slate-500 leading-snug text-start"
                dir="auto"
              >
                you should be proud bitch you should be proud bitch you should
                be proud bitch
              </p>
              <div className="block h-px w-full bg-slate-200 my-4"></div>
              <div className="w-full flex flex-wrap items-start gap-2">
                <h2 className="text-xl font-medium text-slate-600 w-full ">
                  interests
                </h2>
                <div className="px-3 py-1 border rounded-full text-sm hover:text-slate-600 cursor-pointer">
                  football
                </div>
                <div className="px-3 py-1 border rounded-full text-sm hover:text-slate-600 cursor-pointer">
                  reading
                </div>
                <div className="px-3 py-1 border rounded-full text-sm hover:text-slate-600 cursor-pointer">
                  time saver
                </div>
                <div className="px-3 py-1 border rounded-full text-sm hover:text-slate-600 cursor-pointer">
                  tooling
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </MainLayout>
  );
}
