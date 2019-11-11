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

// Allows new tasks to be added and existing tasks to be edited
const AddEditTask = props => {
    const [projects, setProjects] = useState(null);
    const [pageInfo, setPageInfo] = useState({ title: 'Add a new Task', button: 'Add Task', icon: mdiPlus });
    const [task, setTask] = useState({});
    const [taskId, setTaskId] = useState(null);
    const [message, setMessage] = useState(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        // prettier-ignore
        // Get list of tasks to populate the tasks field in the form
        axios.get(process.env.REACT_APP_BACKEND_LOC + 'projects').then(res => {
            setProjects(res.data);
        }).catch(err => console.error('Error getting tasks', err.message));

        // If there is an id paramater in the URL, set to edit mode
        if (props.match.params.id) {
            console.log('Edit Mode');
            setTaskId(props.match.params.id);
            // prettier-ignore
            // Get task to edit and populate the task state object and form
            axios.get(process.env.REACT_APP_BACKEND_LOC + 'tasks/' + props.match.params.id).then(res => {
                setPageInfo({ title: 'Edit Task: ' + res.data.id, button: 'Edit Task', icon: mdiPencil });
                setTask({ ...res.data, due: null });
            }).catch(err =>  console.error(err.message));
        }
    }, [props.match.params.id]);

    // Save any changes in form to state
    const handleChange = e => {
        setTask({
            ...task,
            [e.target.id]: e.target.value
        });
    };

    // Process form data when it's submitted
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        // Ensure the date is valid as the form will consider it valid when it may not be
        if (task.due === null) {
            setMessage({ type: 'danger', value: 'Please enter a valid date!' });
            return;
        }

        // Only proceed if the form is valid
        if (form.checkValidity() === true) {
            setValidated(true);

            if (taskId) {
                // Edit Task
                // prettier-ignore
                axios.put(process.env.REACT_APP_BACKEND_LOC + 'tasks/' + taskId, task).then(res => {
                    setMessage({ type: 'success', value: 'Task Edit Successful!' });
                }).catch(err => setMessage({ type: 'danger', value: err.message }));
            } else {
                // Add Task
                // prettier-ignore
                axios.post(process.env.REACT_APP_BACKEND_LOC + 'tasks', task).then(res => {
                    setMessage({ type: 'success', value: 'Task Added!' });
                }).catch(err => setMessage({ type: 'danger', value: err.message }));
            }

            // Clear the form
            form.reset();
            setTask({});
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
                            <Form.Group controlId="project">
                                <Form.Label>Project:</Form.Label>
                                <Form.Control as="select" onChange={handleChange} value={task.project} required>
                                    {projects &&
                                        projects.map(project => {
                                            return (
                                                <option value={project.id} key={project.id}>
                                                    {project.title}
                                                </option>
                                            );
                                        })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control as="textarea" rows="3" onChange={handleChange} value={task.description} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Due:</Form.Label>
                                <Form.Control as={DateTimePicker} className="dateTime" value={task.due} onChange={timestamp => setTask({ ...task, due: timestamp })} calendarIcon={<Icon path={mdiCalendar} size={1} />} clearIcon={<Icon path={mdiClose} size={1} required />} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                <Icon path={pageInfo.icon} size={1} color="white" />
                                {pageInfo.button}
                            </Button>
                        </Form>
                        <br />
                        {taskId && (
                            <Button as={Link} to={'/tasks/' + taskId} size="sm" variant="secondary">
                                <Icon path={mdiArrowLeft} size={0.8} color="white" /> Back to task
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default withRouter(AddEditTask);
