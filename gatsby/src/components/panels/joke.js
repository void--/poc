import React from "react";
import { graphql } from "gatsby";
import axios from

export const fragment = graphql`
    fragment Joke on ContentfulJoke {
        id
        title
    }
`;

const Joke = (props) => {
    const [joke, setJoke] = useState("...");

    useEffect(() => {

    });

    return (
        <div>joke</div>
    )
}

export default Joke;