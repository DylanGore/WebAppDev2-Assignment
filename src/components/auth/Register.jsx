import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Register = props => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
        console.log(formData);
        firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(cred => {
                setFormData({ ...formData, message: 'User created successfully!', msgType: 'success' });
                console.log('User created successfully!', formData.email);
                props.history.push('/dashboard');
            })
            .catch(err => {
                setFormData({ ...formData, message: err.message, msgType: 'danger' });
                console.log(formData.message);
                return null;
            });
    };

    return (
        <Container fluid>
            <handleSubmit />
            <Row className="justify-content-center text-center">
                <Col>
                    <h1>Register</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6} sm={12}>
                    <DisplayMessage />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control type="text" placeholder="Alias" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type="text" placeholder="Fakename" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>E-mail address:</Form.Label>
                            <Form.Control type="email" placeholder="afakename@example.com" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleChange} />
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
    );
};

export default Register;
