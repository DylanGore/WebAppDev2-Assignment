import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

// Displays a loading icon
const Loading = () => {
    return (
        <Container fluid>
            <Row>
                <Col className="text-center">
                    <Spinner className="pageLoader" animation="grow" variant="dark" />
                </Col>
            </Row>
        </Container>
    );
};

export default Loading;
