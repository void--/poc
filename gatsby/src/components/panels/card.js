import React from "react";
import {graphql} from "gatsby";

export const fragment = graphql`
    fragment Cards on ContentfulCards {
        id
        title
    }
`;

const LeftRight = () => {

    return (
        <div>card</div>
    )
}

export default LeftRight;