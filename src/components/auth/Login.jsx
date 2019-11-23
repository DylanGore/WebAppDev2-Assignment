import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import history from '../../config/history';
import firebase from '../../config/firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PageTitle from '../misc/PageTitle';
import DisplayMessage from '../misc/DisplayMessage';

// User login page
const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState(null);
    const [validated, setValidated] = useState(false);

    // Save any changes in form to state
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Process form data when it's submitted
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        // Only proceed if the form is valid
        if (form.checkValidity() === true) {
            setValidated(true);
            // prettier-ignore
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password).then(() => {
                setMessage({ value: 'Login Successful!', type: 'success' });
                history.push('/dashboard');
            }).catch(err => {
                setMessage({ value: err.message, type: 'danger' });
            });
        } else {
            setMessage({ value: 'Form Invalid!', type: 'danger' });
        }
    };

    return (
        <Fragment>
            <PageTitle title="Login" />
            <Container fluid>
                <Row className="justify-content-center text-center">
                    <Col>
                        <h1>Login</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6} sm={12}>
                        {message && <DisplayMessage message={message} setMessage={setMessage} />}
                        <Form onSubmit={handleSubmit} validated={validated}>
                            <Form.Group controlId="email">
                                <Form.Label>E-mail address:</Form.Label>
                                <Form.Control type="email" placeholder="example@example.com" onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={handleChange} required />
                            </Form.Group>

                            <p className="text-muted">
                                <Link to="/reset-password">Forgot Password?</Link>
                            </p>
                            <p className="text-muted">
                                Haven't got an account yet? Click <Link to="/register">here</Link> to register.
                            </p>

                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Login;
