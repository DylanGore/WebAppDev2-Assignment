import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DateTimePicker from 'react-datetime-picker';
import { mdiCalendar, mdiClose, mdiPlus, mdiPencil, mdiArrowLeft } from '@mdi/js';
import axios from 'axios';
import Icon from '@mdi/react';
import PageTitle from '../misc/PageTitle';
import DisplayMessage from '../misc/DisplayMessage';

// Allows new projects to be added and existing projects to be edited
const AddEditProject = props => {
    const [project, setProject] = useState({ title: '' });
    const [pageInfo, setPageInfo] = useState({ title: 'Add a new Project', button: 'Add Project', icon: mdiPlus });
    const [projectId, setProjectId] = useState(null);
    const [clients, setClients] = useState(null);
    const [message, setMessage] = useState(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        // prettier-ignore
        // Get list of clients to populate the clients field in the form
        axios.get(process.env.REACT_APP_BACKEND_LOC + 'clients').then(res => {
            setClients(res.data);
        }).catch(err => console.error('Error getting clients', err.message));

        // If there is an id paramater in the URL, set to edit mode
        if (props.match.params.id) {
            setProjectId(props.match.params.id);
            console.log('Edit Mode');

            // prettier-ignore
            // Get project to edit and populate the project state object and form
            axios.get(process.env.REACT_APP_BACKEND_LOC + 'projects/' + props.match.params.id).then(res => {
                setPageInfo({ title: 'Edit Project: ' + res.data.title, button: 'Edit Project', icon: mdiPencil });
                setProject({ ...res.data, due: null });
            }).catch(err => console.error(err.message));
        }
    }, [props.match.params.id]);

    // Save any changes in form to state
    const handleChange = e => {
        setProject({
            ...project,
            [e.target.id]: e.target.value
        });
    };

    // Process form data when it's submitted
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        console.log(project);

        // Ensure the date is valid as the form will consider it valid when it may not be
        if (project.due === null) {
            setMessage({ type: 'danger', value: 'Please enter a valid date!' });
            return;
        }

        // Only proceed if the form is valid
        if (form.checkValidity() === true) {
            setValidated(true);

            if (projectId) {
                // Edit Project
                // prettier-ignore
                axios.put(process.env.REACT_APP_BACKEND_LOC + 'projects/' + projectId, project).then(res => {
                    setMessage({ type: 'success', value: 'Project Edit Successful!' });
                }).catch(err => setMessage({ type: 'danger', value: err.message }));
            } else {
                // Add Project
                // prettier-ignore
                axios.post(process.env.REACT_APP_BACKEND_LOC + 'projects', project).then(res => {
                    setMessage({ type: 'success', value: 'Project Added!' });
                }).catch(err => setMessage({ type: 'danger', value: err.message }));
            }

            form.reset();
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
                                <Form.Control as="textarea" rows="3" onChange={handleChange} value={project.description} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Due:</Form.Label>
                                <Form.Control as={DateTimePicker} className="dateTime" value={project.due} onChange={timestamp => setProject({ ...project, due: timestamp })} calendarIcon={<Icon path={mdiCalendar} size={1} />} clearIcon={<Icon path={mdiClose} size={1} required />} />
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
