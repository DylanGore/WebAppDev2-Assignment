import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import PageTitle from '../misc/PageTitle';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({ email: '' });
    const [message, setMessage] = useState(null);
    const [validated, setValidated] = useState(false);

    const DisplayMessage = () => {
        if (!message) {
            return null;
        } else {
            return (
                <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
                    {message.value}
                </Alert>
            );
        }
    };

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            setValidated(true);
            firebase
                .auth()
                .sendPasswordResetEmail(formData.email)
                .then(() => {
                    setMessage({
                        value: 'Password reset request sent, please check your email inbox!',
                        type: 'success'
                    });
                })
                .catch(err => {
                    setMessage({ value: err.message, type: 'danger' });
                });
        }
    };

    return (
        <Fragment>
            <PageTitle title="Forgot Password" />
            <Container fluid>
                <Row className="justify-content-center text-center">
                    <Col>
                        <h1>Reset Password</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6} sm={12}>
                        <DisplayMessage />
                        <Form onSubmit={handleSubmit} validated={validated}>
                            <Form.Group controlId="email">
                                <Form.Label>E-mail address:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="example@example.com"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Reset Password
                            </Button>
                        </Form>
                        <Button as={Link} size="sm" to="/Login" variant="secondary" className="mt-3">
                            <Icon path={mdiArrowLeft} size={1} color="white" />
                            Return to login
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ForgotPassword;
