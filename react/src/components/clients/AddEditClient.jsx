import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { mdiPlus, mdiPencil, mdiArrowLeft } from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';
import PageTitle from '../misc/PageTitle';
import DisplayMessage from '../misc/DisplayMessage';

// Allows new clients to be added and existing clients to be edited
const AddEditClient = props => {
    const [pageInfo, setPageInfo] = useState({ title: 'Add a new Client', button: 'Add Client', icon: mdiPlus });
    const [client, setClient] = useState({ name: '', email: '', phone: '' });
    const [clientId, setClientId] = useState(null);
    const [message, setMessage] = useState(null);
    const [validated, setValidated] = useState(false);
    const [header] = useState({ headers: { AuthToken: localStorage.getItem('authToken') } });

    useEffect(() => {
        // If there is an id paramater in the URL, set to edit mode
        if (props.match.params.id) {
            console.log('Edit Mode');
            setClientId(props.match.params.id);
            // prettier-ignore
            // Get list of clients to populate the clients field in the form
            axios.get(process.env.REACT_APP_BACKEND_LOC + 'clients/' + props.match.params.id, header).then(res => {
                setPageInfo({ title: 'Edit Client: ' + res.data.name, button: 'Edit Client', icon: mdiPencil });
                setClient(res.data);
            }).catch(err => console.error('Error getting clients', err.message));
        }
    }, [props.match.params.id, header]);

    // Save any changes in form to state
    const handleChange = e => {
        setClient({
            ...client,
            [e.target.id]: e.target.value
        });
    };

    // Process form data when it's submitted
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        // Only proceed if form is valid
        if (form.checkValidity() === true) {
            setValidated(true);
            if (clientId) {
                // Edit Client
                // prettier-ignore
                axios.put(process.env.REACT_APP_BACKEND_LOC + 'clients/' + clientId, client, header).then(res => {
                    setMessage({ type: 'success', value: 'Client Edit Successful!' });
                }).catch(err => {
                    setMessage({ type: 'danger', value: err.message });
                });
            } else {
                // Add Client
                // prettier-ignore
                axios.post(process.env.REACT_APP_BACKEND_LOC + 'clients', client, header).then(res => {
                    setMessage({ type: 'success', value: 'Client Added!' });
                }).catch(err => {
                    setMessage({ type: 'danger', value: err.message });
                });
            }
        } else {
            setMessage({ value: 'Invalid Form!', type: 'danger' });
        }
    };

    return (
        <Fragment>
            <PageTitle title={pageInfo.title} />
            <Container fluid>
                <Row className="justify-content-center text-center">
                    <Col>
                        <h1>{pageInfo.title}</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6} sm={12}>
                        {message && <DisplayMessage message={message} setMessage={setMessage} />}
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
        </Fragment>
    );
};

export default withRouter(AddEditClient);
