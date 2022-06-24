import React from "react";
import type { AppProps } from "next/app";
import { NextComponentType } from "next";
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

function MyApp({ Component, pageProps }: CustomAppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 20,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
