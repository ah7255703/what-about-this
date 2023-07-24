/* eslint-disable @next/next/no-img-element */
import Image, { ImageProps } from "next/image";
import React, { forwardRef, useState } from "react";
import { BiXCircle } from "react-icons/bi";
import Portal from "./Portal";

type Props = ImageProps & {
  //
};

const ViewableImage = forwardRef<HTMLImageElement, Props>(
  ({ src, ...props }, _ref) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
      setExpanded(!expanded);
    };
    return (
      <>
        {expanded && (
          <Portal>
            <div className="fixed z-[150] select-none inset-0 p-10 flex items-center justify-center">
              <div className="relative transition ease-in z-[140] max-w-md max-h-full h-auto min-w-fit aspect-square rounded-lg">
                <div className="absolute top-2 left-2">
                  <button
                    onClick={() => setExpanded(false)}
                    className="text-4xl text-slate-950 select-none opacity-70 hover:opacity-100"
                  >
                    <BiXCircle />
                  </button>
                </div>

                <img ref={_ref} src={src.toString()} alt={props.alt} />
              </div>
              <div
                className="fixed z-[130] inset-0 bg-black/50"
                onClick={() => setExpanded(false)}
              ></div>
            </div>
          </Portal>
        )}
        <Image onClick={toggleExpanded} ref={_ref} src={src} {...props} />
      </>
    );
  }
);
ViewableImage.displayName = "ViewableImage";
export default ViewableImage;
