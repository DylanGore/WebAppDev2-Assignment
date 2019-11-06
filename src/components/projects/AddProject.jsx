import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import DateTimePicker from 'react-datetime-picker';
import { mdiCalendar, mdiClose } from '@mdi/js';
import axios from 'axios';
import Icon from '@mdi/react';

const AddProject = () => {
    const [project, setProject] = useState({});
    const [clients, setClients] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_BACKEND_LOC + 'clients')
            .then(res => {
                setClients(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    const handleChange = e => {
        setProject({
            ...project,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        // Use axios to request the list of projects to set the ID
        axios
            .get(process.env.REACT_APP_BACKEND_LOC + 'projects')
            .then(res => {
                var newId = res.data.length + 1;
                axios
                    .post(process.env.REACT_APP_BACKEND_LOC + 'projects', project)
                    .then(res => {
                        setMessage({ type: 'success', value: 'Project Added! (ID: ' + newId + ')' });
                    })
                    .catch(err => {
                        setMessage({ type: 'danger', value: err.message });
                    });
            })
            .catch(err => {
                setMessage({ type: 'danger', value: err.message });
            });

        console.log(project);

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
                    <h1>Add a new Project</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6} sm={12}>
                    <DisplayMessage />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Project Title:</Form.Label>
                            <Form.Control type="text" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="type">
                            <Form.Label>Type:</Form.Label>
                            <Form.Control as="select" onChange={handleChange} required>
                                <option>Website</option>
                                <option>College Assignment</option>
                                <option>Personal Project</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="client">
                            <Form.Label>Client:</Form.Label>
                            <Form.Control as="select" onChange={handleChange} requied>
                                {clients &&
                                    clients.map(client => {
                                        return <option value={parseInt(client.id)}>{client.name}</option>;
                                    })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" rows="3" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Due:</Form.Label>
                            <Form.Control
                                as={DateTimePicker}
                                className="dateTime"
                                value={project.due}
                                onChange={timestamp => setProject({ ...project, due: timestamp })}
                                calendarIcon={<Icon path={mdiCalendar} size={1} />}
                                clearIcon={<Icon path={mdiClose} size={1} required />}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Project
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddProject;
