import React from "react";
import PageLayout from "src/components/Layout";
import CocktailsPage from "src/components/Cocktails";
import CocktailsClass from "src/data/cocktails";
const cocktailsDb = new CocktailsClass();
import Head from "next/head";

export default function () {
  return (
    <PageLayout>
      <Head>
        <title>Cocktail Recipes</title>
      </Head>
      <CocktailsPage cocktailsDb={cocktailsDb} />
    </PageLayout>
  );
}
