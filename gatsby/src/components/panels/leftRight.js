import React from "react";
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
            <div>
                <div>
                    <div>
                        <h3>{props.title}</h3>
                        <p>{text}</p>
                    </div>
                </div>
                <div>
                    <Img placeholderStyle={{filter: `blur(10px)`}} fluid={props.image.image.fluid} />
                </div>
            </div>

        </div>
    )
}

export default LeftRight;