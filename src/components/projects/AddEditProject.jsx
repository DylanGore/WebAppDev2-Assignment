import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
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

const AddEditProject = props => {
    const [project, setProject] = useState({ title: '' });
    const [pageInfo, setPageInfo] = useState({ title: 'Add a new Project', button: 'Add Project' });
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

        if (props.match.params.id) {
            console.log('Edit Mode');
            axios
                .get(process.env.REACT_APP_BACKEND_LOC + 'projects/' + props.match.params.id)
                .then(res => {
                    // console.log(res.data);
                    setPageInfo({ title: 'Edit Project: ' + res.data.title, button: 'Edit Project' });
                    setProject({ ...res.data, due: null });
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }, [props.match.params.id]);

    const handleChange = e => {
        setProject({
            ...project,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        console.log(project);

        if (project.due === null) {
            setMessage({ type: 'danger', value: 'Please enter a valid date!' });
            return;
        }

        if (props.match.params.id) {
            // Edit Project
            axios
                .put(process.env.REACT_APP_BACKEND_LOC + 'projects/' + props.match.params.id, project)
                .then(res => {
                    setMessage({ type: 'success', value: 'Project Edit Successful!' });
                })
                .catch(err => {
                    setMessage({ type: 'danger', value: err.message });
                });
        } else {
            // Add Project
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
        }
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
                    <h1>{pageInfo.title}</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6} sm={12}>
                    <DisplayMessage />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Project Title:</Form.Label>
                            <Form.Control type="text" onChange={handleChange} value={project.title} required />
                        </Form.Group>
                        <Form.Group controlId="type">
                            <Form.Label>Type:</Form.Label>
                            <Form.Control as="select" onChange={handleChange} value={project.type} required>
                                <option>Website</option>
                                <option>College Assignment</option>
                                <option>Personal Project</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="client">
                            <Form.Label>Client:</Form.Label>
                            <Form.Control as="select" onChange={handleChange} value={project.client} required>
                                {clients &&
                                    clients.map(client => {
                                        return (
                                            <option value={parseInt(client.id)} key={client.id}>
                                                {client.name}
                                            </option>
                                        );
                                    })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                onChange={handleChange}
                                value={project.description}
                                required
                            />
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
                            {pageInfo.button}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default withRouter(AddEditProject);
