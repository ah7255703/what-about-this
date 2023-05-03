import { createGetInitialProps } from "@mantine/next";
import Document, {
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

export const getInitialProps = createGetInitialProps();

export default function Document_({ locale, __NEXT_DATA__ }: DocumentProps) {
  return (
    <Html
      dir={locale?.includes("ar") ? "rtl" : "ltr"}
      lang={locale || __NEXT_DATA__.defaultLocale}
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
