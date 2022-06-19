import React from "react";
import type { AppProps } from "next/app";
import { NextComponentType } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider, Hydrate, QueryClient } from "react-query";

import theme from "../theme";
import "../styles/globals.css";
import Layout from "../components/Layout";
import AppProvider from "../context/app.context";
import Protected from "../components/Protected/Protected";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const queryClient = React.useRef(new QueryClient());
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <AppProvider>
              <Layout>
                {Component.auth ? (
                  <Protected>
                    <Component {...pageProps} />
                  </Protected>
                ) : (
                  <Component {...pageProps} />
                )}
              </Layout>
            </AppProvider>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
