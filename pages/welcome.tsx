import React from "react";
import { type ISlideConfig, SlideParallaxType } from "react-page-slides";
import dynamic from "next/dynamic";

const PageSlides = dynamic(
  () => import("react-page-slides").then((v) => v.PageSlides),
  { ssr: false }
);
const slides: ISlideConfig[] = [
  {
    content: <></>,
    style: {},
  },
  {
    content: <div>second page content</div>,
    style: {},
  },
];
const MainPage = () => {
  return (
    <PageSlides
      enableAutoScroll={true}
      transitionSpeed={1000}
      slides={slides}
      parallax={{
        offset: 0.6,
        type: SlideParallaxType.cover,
      }}
    />
  );
};

function welcome({}) {
  return <div>{<MainPage />}</div>;
}

export default welcome;
