import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import {graphql} from "gatsby";

export const fragment = graphql`
    fragment Cards on ContentfulCards {
        id
        title
    }
`;

const LeftRight = () => {

    return (
        <Container>
            <Row>
                <Col>hero</Col>
                <Col>2 of 2</Col>
            </Row>
        </Container>
    )
}

export default LeftRight;