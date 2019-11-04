import React, { useState } from 'react';
import firebase from '../../config/firebaseConfig';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: ''
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
            .sendPasswordResetEmail(formData.email)
            .then(() => {
                setFormData({ ...formData, message: 'Password reset request sent!', msgType: 'success' });
            })
            .catch(err => {
                setFormData({ ...formData, message: err.message, msgType: 'danger' });
            });
    };

    return (
        <Container fluid>
            <Row className="justify-content-center text-center">
                <Col>
                    <h1>Reset Password</h1>
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

                        <Button variant="primary" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPassword;
