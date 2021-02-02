const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `../.env.${activeEnv}`,
})

const incomingHookBody = process.env.INCOMING_HOOK_BODY ? JSON.parse(decodeURIComponent(process.env.INCOMING_HOOK_BODY)) : {};
console.log("Incoming hook body: ", incomingHookBody);

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `talend-poc`,
        short_name: `foistered`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: '0s0noii5mpe8',
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: 'KUVtJfRx0RzZMcqlWZh_Ss-fpyvvkjsUJN1Loc-AGxw',
        host: `preview.contentful.com`,
        // If we're using a branch deploy, the Contentful environment should be
        // the same as the branch.
        environment: 'master',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
