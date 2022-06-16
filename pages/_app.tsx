import React from "react";
import type { AppProps } from "next/app";
import { QueryClientProvider, Hydrate, QueryClient } from "react-query";

import "../styles/globals.css";
import AppProvider from "../context/app.context";
import Layout from "../components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = React.useRef(new QueryClient());
  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <AppProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
