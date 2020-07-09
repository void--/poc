import {graphql, Link, useStaticQuery} from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {Navbar, Nav, NavDropdown} from "react-bootstrap";

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
            <NavDropdown key={item.id} id={`basic-nav-dropdown-${item.id}`} title={item.title}>
                {item.subLinks.map((subItem) => (
                    <NavDropdown.Item key={subItem.id}><Link to={subItem.destinationUrl}>{subItem.title}</Link></NavDropdown.Item>
                ))}
            </NavDropdown> :
            <Nav.Link key={item.id}><Link to={item.destinationUrl}>{item.title}</Link></Nav.Link>
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
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand><Link to={'/'}>Contentful POC</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            { menu }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    )
}

export default Header
