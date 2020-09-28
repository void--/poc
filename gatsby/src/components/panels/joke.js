import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import axios from "axios";

export const fragment = graphql`
    fragment Joke on ContentfulJoke {
        id
        title
    }
`;

const Joke = (props) => {
    const [joke, setJoke] = useState("");
    const [loading, setLoading] = useState(0);

    useEffect(() => {
        if (!loading) return;

        (async () => {
            const joke = await axios.get("/api/test");
            setJoke(joke.data);
            setLoading(0);
        })();

    }, [loading]);


    return (
        <>
            {joke
                ? <><h2>This is a joke:</h2><div>{joke}</div></>
                : <h2>Would you like a joke?</h2>
            }
            <button onClick={() => setLoading(1)}>{joke && "new"} joke please</button>
        </>
    )
}

export default Joke;
