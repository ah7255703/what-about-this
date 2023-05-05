import React from 'react'
import { AppType } from "next/app";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { type Database } from "db";
import {
  NextIntlProvider,
  type AbstractIntlMessages,
} from "next-intl";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { cairoFont, notoFont } from "utils/fonts";
import {Toaster} from 'react-hot-toast'

const MyApp: AppType<{
  messages: AbstractIntlMessages;
}> = ({ Component, pageProps: { ...pageProps } }) => {
  const [supaClient] = useState(() => createBrowserSupabaseClient<Database>());
  const { locale } = useRouter();
  console.log(locale);
  
  return (
    <>
    <SessionContextProvider supabaseClient={supaClient}>
      <NextIntlProvider messages={pageProps.messages}>
        <div className={`${cairoFont.variable} ${notoFont.variable} ltr:font-noto rtl:font-cairo`}>
          <Toaster position='top-center' />
          <Component {...pageProps} />
        </div>
      </NextIntlProvider>
    </SessionContextProvider>
    </>
  );
};
export default MyApp;
