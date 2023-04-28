import { type AppType } from "next/app";
import { MantineProvider } from '@mantine/core';


const MyApp: AppType = ({
      Component,
      pageProps: { ...pageProps },
    }) => {

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default MyApp
