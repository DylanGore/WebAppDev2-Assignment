import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import DateTimePicker from 'react-datetime-picker';
import { mdiCalendar, mdiClose, mdiPlus, mdiPencil, mdiArrowLeft } from '@mdi/js';
import axios from 'axios';
import Icon from '@mdi/react';
import PageTitle from '../misc/PageTitle';

const AddEditProject = props => {
    const [project, setProject] = useState({ title: '' });
    const [pageInfo, setPageInfo] = useState({ title: 'Add a new Project', button: 'Add Project', icon: mdiPlus });
    const [projectId, setProjectId] = useState(null);
    const [clients, setClients] = useState(null);
    const [message, setMessage] = useState(null);
    const [validated, setValidated] = useState(false);

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
            setProjectId(props.match.params.id);
            console.log('Edit Mode');
            axios
                .get(process.env.REACT_APP_BACKEND_LOC + 'projects/' + props.match.params.id)
                .then(res => {
                    setPageInfo({ title: 'Edit Project: ' + res.data.title, button: 'Edit Project', icon: mdiPencil });
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

        if (form.checkValidity() === true) {
            setValidated(true);

            if (projectId) {
                // Edit Project
                axios
                    .put(process.env.REACT_APP_BACKEND_LOC + 'projects/' + projectId, project)
                    .then(res => {
                        setMessage({ type: 'success', value: 'Project Edit Successful!' });
                    })
                    .catch(err => {
                        setMessage({ type: 'danger', value: err.message });
                    });
            } else {
                // Add Project
                axios
                    .post(process.env.REACT_APP_BACKEND_LOC + 'projects', project)
                    .then(res => {
                        setMessage({ type: 'success', value: 'Project Added!' });
                    })
                    .catch(err => {
                        setMessage({ type: 'danger', value: err.message });
                    });
            }

            form.reset();
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
                    <DisplayMessage />
                    <Form onSubmit={handleSubmit} validated={validated}>
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
                            <Icon path={pageInfo.icon} size={1} color="white" /> {pageInfo.button}
                        </Button>
                    </Form>
                    <br />
                    {projectId && (
                        <Button as={Link} to={'/projects/' + projectId} size="sm" variant="secondary">
                            <Icon path={mdiArrowLeft} size={0.8} color="white" /> Back to project
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
        </Fragment>
    );
};

export default withRouter(AddEditProject);
