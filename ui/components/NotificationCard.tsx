import React from "react";
import WAvatar from "./Avatar";

type Props = {
  type?: "commment" | "starred";
  payload?: Props["type"] extends "comment" ? { comment: string } : never;
};

export default function NotiCard({ type, payload }: Props) {
  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div className="flex flex-row items-center gap-1">
        <WAvatar size="md" fallback="AH" />
        <div className="text-sm">
          <h3 className="font-semibold inline">Ahmad Hassan</h3>
          <span className="font-normal inline text-black mx-2">{type === "commment" ? "Commented on" : "Starred"}</span>
          <span className="inline">your post</span>
        </div>
      </div>
      {type !== "commment" && <div className="block text-xs mx-4 bg-slate-100 text-slate-500 p-3 mt-3 rounded-md">
        aewsome man
        </div>}
    </div>
  );
}
