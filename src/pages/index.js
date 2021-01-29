import React from "react";
import Head from "next/head";
import Layout from "src/components/Layout/Layout";
import Cocktails from "src/components/Cocktails/Cocktails";

export default class extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>Cocktail Recipes</title>
        </Head>
        <Layout>
          <Cocktails />
        </Layout>
      </>
    );
  }
}
