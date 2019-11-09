import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Particles from 'react-particles-js';
import options from '../../config/particles';

const Home = () => {
    const [user] = useAuthState(firebase.auth());

    const DisplayButton = () => {
        if (user) {
            return (
                <Button as={Link} to="/dashboard" variant="primary" block>
                    Go to Dashboard
                </Button>
            );
        } else {
            return (
                <Button as={Link} to="/login" variant="primary" block>
                    Login
                </Button>
            );
        }
    };
    return (
        <Fragment>
            <Particles className="particles" params={options} />
            <Container className="full-container d-flex" fluid>
                <Row className="align-items-center h-100 w-100 full-row">
                    <Col sm={12} md={6} className="mx-auto w-100 coltest">
                        <Jumbotron className="text-center px-5" fluid>
                            <h1>Project Manager</h1>
                            <p>
                                This is a simple project management app. It has authentication and registion along with
                                the ability to add, view, edit and remove projects. It also features client and task
                                management.
                            </p>
                            <p>
                                <DisplayButton />
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Home;
