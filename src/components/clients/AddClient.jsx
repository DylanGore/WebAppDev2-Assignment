import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const AddClient = () => {
    const [client, setClient] = useState({});
    const [message, setMessage] = useState(null);

    const handleChange = e => {
        setClient({
            ...client,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        // Use axios to request the list of tasks to set the ID
        axios
            .get(process.env.REACT_APP_BACKEND_LOC + 'clients')
            .then(res => {
                var newId = res.data.length + 1;
                axios
                    .post(process.env.REACT_APP_BACKEND_LOC + 'clients', client)
                    .then(res => {
                        setMessage({ type: 'success', value: 'Client Added! (ID: ' + newId + ')' });
                    })
                    .catch(err => {
                        setMessage({ type: 'danger', value: err.message });
                    });
            })
            .catch(err => {
                setMessage({ type: 'danger', value: err.message });
            });

        form.reset();
    };

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

    return (
        <Container fluid>
            <Row className="justify-content-center text-center">
                <Col>
                    <h1>Add a new Client</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6} sm={12}>
                    <DisplayMessage />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>E-mail Address:</Form.Label>
                            <Form.Control type="emial" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone Number:</Form.Label>
                            <Form.Control type="phone" onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Client
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddClient;
