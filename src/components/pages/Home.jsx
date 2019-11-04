import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
    return (
        <Container fluid>
            <Row>
                <Col className="mx-auto text-center">
                    <h1>Home</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
