import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiAlert, mdiHome } from '@mdi/js';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="text-center">
                    <Icon path={mdiAlert} title="Error 404" size={5} color="red" />
                    <h1>
                        Error 401
                        <br />
                        <small className="text-muted">Unauthorized </small>
                    </h1>
                    <p className="lead">
                        You are not authorized to view this page, please <Link to="/login">login</Link>.
                    </p>
                    <Button variant="dark" as={Link} to="/">
                        Go to Homepage <Icon path={mdiHome} title="Home" size={1} color="white" />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Unauthorized;
