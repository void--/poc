import {graphql, Link, useStaticQuery} from "gatsby"
import React from "react"

const Header = ({siteTitle}) => {
    const menuLinkData = useStaticQuery(graphql`
      query menuLinkContentQuery {
        contentfulMenu(node_locale: {eq: "en-US"}, title: {eq: "Main nav"}) {
            id
            links {
              id
              title
              destinationUrl
              subLinks {
                id
                title
                destinationUrl
              }
            }
          }
      }
    `)

    const menu = menuLinkData.contentfulMenu.links.map((item) => (
        item.subLinks ?
            <div key={item.id} id={`basic-nav-dropdown-${item.id}`} title={item.title}>
                {item.subLinks.map((subItem) => (
                    <div key={subItem.id}><Link to={subItem.destinationUrl}>{subItem.title}</Link></div>
                ))}
            </div> :
            <div key={item.id}><Link to={item.destinationUrl}>{item.title}</Link></div>
    ));

    return (
        <header>
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `1.45rem 1.0875rem`,
                }}
            >
                <div bg="light" expand="lg">
                    <div><Link to={'/'}>Contentful POC</Link></div>
                    <div aria-controls="basic-navbar-nav"/>
                    <div id="basic-navbar-nav">
                        <div className="mr-auto">
                            { menu }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
