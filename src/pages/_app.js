import React from "react";
import "src/styles/reset.scss";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/icomoon/style.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
