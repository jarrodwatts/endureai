import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/lib/mui/createEmotionCache";
import theme from "@/lib/mui/theme";
import "@/styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Endure: AI Therapy Application for Mental Health | Endure AI
        </title>
        <meta
          name="description"
          content="Endure is an AI therapy application that provides personalized therapy sessions for individuals struggling with mental health issues. Our app uses advanced machine learning algorithms to create custom therapy plans tailored to your unique needs."
        />
        <meta
          name="keywords"
          content="AI therapy, mental health, machine learning, personalized therapy, mental health app"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
