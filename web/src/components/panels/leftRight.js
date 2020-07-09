import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import {graphql} from "gatsby";
import Img from 'gatsby-image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const fragment = graphql`
    fragment LeftRight on ContentfulLeftRight {
        id
        title
        text {
          json
        }
        image {
          id
          image {
            fluid(maxWidth: 500){
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
    }
`;

const LeftRight = (props) => {

    const text = documentToReactComponents(props.text.json);

    return (
        <div style={{position: 'relative'}}>
            <Row>
                <Col>
                    <Container>
                        <h3>{props.title}</h3>
                        <p>{text}</p>
                    </Container>
                </Col>
                <Col>
                    <Img placeholderStyle={{filter: `blur(10px)`}} fluid={props.image.image.fluid} />
                </Col>
            </Row>

        </div>
    )
}

export default LeftRight;