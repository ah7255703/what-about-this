import WAvatar from "./Avatar";
import React from "react";
import ViewableImage from "./ViewableImage";

export default function PollListView() {
    return (
      <div className="poll w-full min-h-fit p-4 py-5 block bg-white rounded-lg">
        <div className="header">
          <div className="flex items-baseline gap-1">
            <WAvatar size="lg" fallback="AH" />
            <div className="user-details">
              <div className="flex items-start flex-col">
                <h2 className="text-xl font-semibold">Ahmad Hassan</h2>
                <span className="link text-xs font-medium">@32584</span>
              </div>
            </div>
          </div>
        </div>
        <div className="body my-3 w-full">
          <div className="question text-2xl font-normal text-start my-2">
            <h3>What About This ?</h3>
          </div>
          <div className="w-full h-auto aspect-square relative block">
            <div className="flex items-center flex-col">
              <div className="relative h-auto min-w-full aspect-square">
                <ViewableImage
                  className="rounded-lg"
                  fill
                  src={"https://picsum.photos/700/300"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }