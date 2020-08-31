import React from "react";
import {graphql} from "gatsby";
import Img from 'gatsby-image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const fragment = graphql`
    fragment Hero on ContentfulHero {
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

const Hero = (props) => {
    console.log(props);

    const text = documentToReactComponents(props.text.json);

    return (
        <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', zIndex: 5, top: 0, left: 0, right: 0, bottom: 0, color: 'white', display: 'flex', flexDirection: 'column', flexAlign: 'center', justifyContent: 'center', background: `rgba(0,0,0,0.5)`}}>
                <h1>{props.title}</h1>
                <p>{text}</p>
            </div>
            <Img placeholderStyle={{filter: `blur(10px)`}} fluid={props.image.image.fluid} />
        </div>
    )
}

export default Hero;