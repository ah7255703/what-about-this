import { Noto_Sans, Cairo } from "next/font/google";

export const cairoFont = Cairo({
    subsets: ["arabic"],
    variable:'--font-cairo',
  });
  
export const notoFont = Noto_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable:'--font-noto'
  });
  