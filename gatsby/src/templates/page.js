import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Hero, {} from '../components/panels/hero';
import LeftRight from '../components/panels/leftRight';
import Cards from '../components/panels/cards';
import Joke from "../components/panels/joke";
import SEO from "../components/seo";

export const query = graphql`
  query($id: String!) {
      contentfulPage(id: {eq: $id}) {
        id
        title
        panels {
          __typename
          ...Hero
          ...Cards
          ...LeftRight
          ...Joke
        }
      }
  }
`

const panelMap = {
    ContentfulHero: Hero,
    ContentfulLeftRight: LeftRight,
    ContentfulCards: Cards,
    ContentfulJoke: Joke,
};

export default ({data}) => {
    const page = data.contentfulPage;
    const panels = page.panels.map((el, i) => {
        let Panel = panelMap[el.__typename];
        return <Panel key={i} {...el} />
    });

    return (
        <Layout>
            <SEO title={page.title} />
            <div>
                <h1>new test feature</h1>
                <h1>{page.title}</h1>
                {panels}
            </div>
        </Layout>
    );
}
