import React from "react";
import { graphql } from "gatsby";

export const fragment = graphql`
    fragment Card on ContentfulCards {
        cards {
            title
            image {
              id
              image {
                fluid(maxWidth: 500){
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
        }
    }
`;

const LeftRight = (props) => {
    console.log(props);

    return (
        <div>card</div>
    )
}

export default LeftRight;