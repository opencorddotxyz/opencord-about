import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Head from "next/head";
const theme = extendTheme({
  fonts: {
    body: 'Outfit, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>Opencord, the Web 3.0 social platform built for DAOs.</title>
        <meta
          name="description"
          // eslint-disable-next-line max-len
          content="Opencord is designed for the efficient connections of DAOs, the seamless connections of Dapps, and the like-mindedness connections of DAO friends."
        />
        <meta
          name="keywords"
          content="Opencord, web3, social, DAO, Dapp, NFT, POAP"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
