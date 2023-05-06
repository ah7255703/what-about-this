import Button from "components/Button";
import Input from "components/Input";
import PollEditorLayout from "layouts/pollEditor";
import React from "react";
import { BiImageAdd, BiPlus, BiX } from "react-icons/bi";

export default function DetailPollPageIndex() {
  return (
    <PollEditorLayout>
      <div className="w-full px-2">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-medium">Options</h2>
          <Button intent="primary" className="rounded-full p-2 text-white">
            <BiPlus size={25} />
          </Button>
        </div>
        <div className="block my-2 w-full h-px bg-black/20" />
        <div className="options">
          <div className="option">
            <div className="input flex items-center gap-2 justify-between border-slate-300 border-[1px] p-1 rounded-full">
              <Input inputClassName="border-none" className="flex-1" />
              <div className="controllers flex items-center gap-2">
                <Button intent="danger" className="p-1 rounded-full">
                  <BiX />
                </Button>
                <Button intent="outline" className="p-1 rounded-full">
                  <BiImageAdd />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PollEditorLayout>
  );
}
