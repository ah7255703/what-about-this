import React from "react";
import { DocumentProps, Head, Html, Main, NextScript } from "next/document";
export default function Document_({ locale, __NEXT_DATA__ }: DocumentProps) {
  return (
    <Html
      dir={locale === "ar" ? "rtl" : "ltr"}
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
