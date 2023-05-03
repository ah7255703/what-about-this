/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { type AppType } from "next/app";
import { MantineProvider } from "@mantine/core";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { type Database } from "db";


const MyApp: AppType = ({ Component,pageProps: {...pageProps } }) => {
  const [supaClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  )

    
  return (
    <SessionContextProvider supabaseClient={supaClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionContextProvider>
  );
};

export default MyApp;
