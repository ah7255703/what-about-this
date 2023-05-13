import { createContext, useContext } from "react";

export const ImageViewerContext = createContext<{
  current?: string | null;
  close: () => void;
  setCurrent: (url: string) => void;
} | null>(null);

export default function useImageViewer() {
  return useContext(ImageViewerContext);
}
