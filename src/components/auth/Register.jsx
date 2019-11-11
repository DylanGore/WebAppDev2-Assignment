import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import history from '../../config/history';
import firebase from '../../config/firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import gravatar from 'gravatar';
import PageTitle from '../misc/PageTitle';
import DisplayMessage from '../misc/DisplayMessage';

// User registration page
const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const [message, setMessage] = useState(null);
    const [validated, setValidated] = useState(false);

    // Save any changes in form to state
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });

        // Check that both password fields match
        if (e.target.id === 'passwordConfirm') {
            if (e.target.value !== formData.password) {
                e.target.setCustomValidity('Passwords must match!');
            } else {
                e.target.setCustomValidity('');
            }
        }
    };

    // Process form data when it's submitted
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        // Only proceed if the form is valid
        if (form.checkValidity() === true) {
            setValidated(true);
            // prettier-ignore
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(cred => {
                setMessage({ value: 'User created successfully!', type: 'success' });
                console.log('User created successfully!', formData.email);
                // Get user's avatar using their email address, if it doesn't exist with Gravatar, use default
                let avatarUrl = gravatar.url(formData.email, { size: 24, default: 'mp' }, true);
                // Add users's name and avatar to their Firebase profile
                cred.user.updateProfile({
                        displayName: formData.firstName + ' ' + formData.lastName,
                        photoURL: avatarUrl
                    }).then(() => {
                        // Required to update user state after adding name and avatar
                        window.location.reload();
                        history.push('/dashboard');
                    }).catch(err => {
                        console.error('Error updating profile', err.message);
                    });
            }).catch(err => {
                setMessage({ value: err.message, type: 'danger' });
                console.error('User creation error', err.message);
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
                        {message && <DisplayMessage message={message} setMessage={setMessage} />}
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
                                <Form.Control type="email" placeholder="afakename@example.com" onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={handleChange} pattern=".{6,}" required />
                            </Form.Group>
                            <Form.Group controlId="passwordConfirm">
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" onChange={handleChange} pattern=".{6,}" required />
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
