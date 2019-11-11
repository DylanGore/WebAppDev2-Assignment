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

const AddEditTask = props => {
    const [projects, setProjects] = useState(null);
    const [pageInfo, setPageInfo] = useState({ title: 'Add a new Task', button: 'Add Task', icon: mdiPlus });
    const [task, setTask] = useState({});
    const [taskId, setTaskId] = useState(null);
    const [message, setMessage] = useState(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_BACKEND_LOC + 'projects')
            .then(res => {
                setProjects(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });

        // Edit Mode
        if (props.match.params.id) {
            setTaskId(props.match.params.id);
            console.log('Edit Mode');
            axios
                .get(process.env.REACT_APP_BACKEND_LOC + 'tasks/' + props.match.params.id)
                .then(res => {
                    // console.log(res.data);
                    setPageInfo({ title: 'Edit Task: ' + res.data.id, button: 'Edit Task', icon: mdiPencil });
                    setTask({ ...res.data, due: null });
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }, [props.match.params.id]);

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;

        if (task.due === null) {
            setMessage({ type: 'danger', value: 'Please enter a valid date!' });
            return;
        }

        if (form.checkValidity() === true) {
            setValidated(true);

            if (taskId) {
                // Edit Task
                axios
                    .put(process.env.REACT_APP_BACKEND_LOC + 'tasks/' + taskId, task)
                    .then(res => {
                        setMessage({ type: 'success', value: 'Task Edit Successful!' });
                    })
                    .catch(err => {
                        setMessage({ type: 'danger', value: err.message });
                    });
            } else {
                // Add Task
                axios
                    .post(process.env.REACT_APP_BACKEND_LOC + 'tasks', task)
                    .then(res => {
                        setMessage({ type: 'success', value: 'Task Added!' });
                    })
                    .catch(err => {
                        setMessage({ type: 'danger', value: err.message });
                    });
            }

            form.reset();
            setTask({});
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
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    onChange={handleChange}
                                    value={task.description}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Due:</Form.Label>
                                <Form.Control
                                    as={DateTimePicker}
                                    className="dateTime"
                                    value={task.due}
                                    onChange={timestamp => setTask({ ...task, due: timestamp })}
                                    calendarIcon={<Icon path={mdiCalendar} size={1} />}
                                    clearIcon={<Icon path={mdiClose} size={1} required />}
                                />
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
