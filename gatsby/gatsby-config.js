const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `../.env.${activeEnv}`,
})

console.log("ASDFQWER", process.env.CONTEXT);

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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.PREVIEW ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_DELIVERY_TOKEN,
        host: process.env.PREVIEW ? `preview.contentful.com` : `cdn.contentful.com`,
        // If we're using a branch deploy, the Contentful environment should be
        // the same as the branch. CONTEXT env variable is set in netlify.toml
        // and can be overridden there for specific branches.
        environment: process.env.CONTEXT === 'branch-deploy' ?
            process.env.BRANCH :
            process.env.CONTENTFUL_ENV,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
