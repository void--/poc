import React from "react";
import { graphql } from "gatsby";
import Card from "./card";

export const fragment = graphql`
    fragment Cards on ContentfulCards {
        id
        title
        ...Card
    }
`;

const Cards = (props) => {
    const cards = props.cards.map((card, i) => <Card key={i} props={card} />);
    return (
        <>{cards}</>
    );
}

export default Cards;
