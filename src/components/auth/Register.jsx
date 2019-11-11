import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import gravatar from 'gravatar';
import PageTitle from '../misc/PageTitle';

const Register = props => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
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

        if (e.target.id === 'passwordConfirm') {
            if (e.target.value !== formData.password) {
                e.target.setCustomValidity('Passwords must match!');
            } else {
                e.target.setCustomValidity('');
            }
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === true) {
            setValidated(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(cred => {
                    setMessage({ value: 'User created successfully!', type: 'success' });
                    console.log('User created successfully!', formData.email);
                    let avatarUrl = gravatar.url(formData.email, { size: 24, default: 'mp' }, true);
                    cred.user
                        .updateProfile({
                            displayName: formData.firstName + ' ' + formData.lastName,
                            photoURL: avatarUrl
                        })
                        .then(() => {
                            // Required to update user state after adding name and avatar
                            window.location.reload();
                            props.history.push('/dashboard');
                        })
                        .catch(function(error) {
                            console.log('Error updating profile!');
                        });
                })
                .catch(err => {
                    setMessage({ value: err.message, type: 'danger' });
                    console.log(formData.message);
                    return null;
                });
        } else {
            setMessage({ value: 'Form Invalid!', type: 'danger' });
        }
    };

    return (
        <Fragment>
            <PageTitle title="Register" />
            <Container fluid>
                <Row className="justify-content-center text-center">
                    <Col>
                        <h1>Register</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6} sm={12}>
                        <DisplayMessage />
                        <Form onSubmit={handleSubmit} validated={validated}>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control type="text" placeholder="Alias" onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type="text" placeholder="Fakename" onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>E-mail address:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="afakename@example.com"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    pattern=".{6,}"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="passwordConfirm">
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    pattern=".{6,}"
                                    required
                                />
                            </Form.Group>

                            <p className="text-muted">
                                Already have an account? Click <Link to="/login">here</Link> to login.
                            </p>

                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Register;
