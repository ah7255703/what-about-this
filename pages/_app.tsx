import { AppType } from "next/app";
import { MantineProvider } from "@mantine/core";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { type Database } from "db";
import { NextIntlProvider, type AbstractIntlMessages } from "next-intl";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";


const MyApp: AppType<{
  messages: AbstractIntlMessages;
}> = ({ Component, pageProps: { ...pageProps } }) => {
  const [supaClient] = useState(() => createBrowserSupabaseClient<Database>());
  console.log(pageProps.messages);

  return (
    <SessionContextProvider supabaseClient={supaClient}>
      <NextIntlProvider messages={pageProps.messages}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
          }}
        >
          <Notifications />
          <ModalsProvider>
            <Component {...pageProps} />
          </ModalsProvider>
        </MantineProvider>
      </NextIntlProvider>
    </SessionContextProvider>
  );
};
export default MyApp;
