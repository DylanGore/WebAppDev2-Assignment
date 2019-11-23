import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiAlert, mdiHome } from '@mdi/js';
import { Link } from 'react-router-dom';
import PageTitle from '../misc/PageTitle';

// 404 error page
const NotFound = () => {
    return (
        <Fragment>
            <PageTitle title="404 - Not Found" />
            <Container fluid>
                <Row className="justify-content-center">
                    <Col className="text-center">
                        <Icon path={mdiAlert} title="Error 404" size={5} color="red" />
                        <h1>
                            Error 404
                            <br />
                            <small className="text-muted">Not Found</small>
                        </h1>
                        <p className="lead">The content you are looking for could not be found at this address, please check the URL and try again.</p>
                        <Button variant="dark" as={Link} to="/">
                            Go to Homepage <Icon path={mdiHome} title="Home" size={1} color="white" />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default NotFound;
