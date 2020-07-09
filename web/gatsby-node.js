/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`);

exports.onCreateNode = ({node}) => {
    if (node.internal.type === 'node__page') {
        console.log(node.internal);
    }
}

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;
    return graphql(`
    {
      allContentfulPage {
        nodes {
          id
          title
          slug
          node_locale
        }
      }
    }`
    ).then(result => {
        result.data.allContentfulPage.nodes.forEach(node => {
            const prefix = node.node_locale === 'en-US' ? '' : node.node_locale;
            createPage({
                path: `${prefix}${node.slug}`,
                component: path.resolve(`./src/templates/page.js`),
                context: {
                    id: node.id,
                },
            })
        })
    })
}