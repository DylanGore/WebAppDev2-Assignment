import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import history from '../../config/history';
import firebase from '../../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Unauthorized from '../error/Unauthorized';
const Login = () => {
    const [user] = useAuthState(firebase.auth());

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        message: '',
        msgType: ''
    });

    const DisplayMessage = () => {
        if (!formData.message) {
            return null;
        } else {
            return (
                <Alert variant={formData.msgType} onClose={() => setFormData({ ...formData, message: '' })} dismissible>
                    {formData.message}
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
        firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                setFormData({ ...formData, message: 'Login Successful!', msgType: 'success' });
                history.push('/dashboard');
            })
            .catch(err => {
                setFormData({ ...formData, message: err.message, msgType: 'danger' });
            });
    };

    if (!user) {
        return (
            <Container fluid>
                <Row className="justify-content-center text-center">
                    <Col>
                        <h1>Login</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6} sm={12}>
                        <DisplayMessage />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>E-mail address:</Form.Label>
                                <Form.Control type="email" placeholder="example@example.com" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={handleChange} />
                            </Form.Group>

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
        );
    } else {
        return <Unauthorized />;
    }
};

export default Login;
