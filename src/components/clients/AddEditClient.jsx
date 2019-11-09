import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { mdiPlus, mdiPencil, mdiArrowLeft } from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';

const AddEditClient = props => {
    const [pageInfo, setPageInfo] = useState({ title: 'Add a new Client', button: 'Add Client', icon: mdiPlus });
    const [client, setClient] = useState({ name: '', email: '', phone: '' });
    const [clientId, setClientId] = useState(null);
    const [message, setMessage] = useState(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (props.match.params.id) {
            console.log('Edit Mode');
            setClientId(props.match.params.id);
            axios
                .get(process.env.REACT_APP_BACKEND_LOC + 'clients/' + props.match.params.id)
                .then(res => {
                    // console.log(res.data);
                    setPageInfo({ title: 'Edit Client: ' + res.data.name, button: 'Edit Client', icon: mdiPencil });
                    setClient(res.data);
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }, [props.match.params.id]);

    const handleChange = e => {
        setClient({
            ...client,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            setValidated(true);
            if (clientId) {
                // Edit Client
                axios
                    .put(process.env.REACT_APP_BACKEND_LOC + 'clients/' + clientId, client)
                    .then(res => {
                        setMessage({ type: 'success', value: 'Client Edit Successful!' });
                    })
                    .catch(err => {
                        setMessage({ type: 'danger', value: err.message });
                    });
            } else {
                // Add Client
                axios
                    .post(process.env.REACT_APP_BACKEND_LOC + 'clients', client)
                    .then(res => {
                        setMessage({ type: 'success', value: 'Client Added!' });
                    })
                    .catch(err => {
                        setMessage({ type: 'danger', value: err.message });
                    });
            }
        } else {
            setMessage({ value: 'Invalid Form!', type: 'danger' });
        }
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
                    <h1>{pageInfo.title}</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6} sm={12}>
                    <DisplayMessage />
                    <Form onSubmit={handleSubmit} validated={validated}>
                        <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" onChange={handleChange} value={client.name} required />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>E-mail Address:</Form.Label>
                            <Form.Control type="emial" onChange={handleChange} value={client.email} required />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone Number:</Form.Label>
                            <Form.Control type="phone" onChange={handleChange} value={client.phone} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            <Icon path={pageInfo.icon} size={1} color="white" />
                            {pageInfo.button}
                        </Button>
                    </Form>
                    <br />
                    {clientId && (
                        <Button as={Link} to={'/clients/' + clientId} size="sm" variant="secondary">
                            <Icon path={mdiArrowLeft} size={0.8} color="white" /> Back to client
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default withRouter(AddEditClient);
