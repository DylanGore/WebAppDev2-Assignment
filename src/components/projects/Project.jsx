import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import history from '../../config/history';
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import TaskList from '../tasks/TaskList';
import Loading from '../layout/Loading';
import Icon from '@mdi/react';
import { mdiPencil, mdiDelete, mdiPlus } from '@mdi/js';
import DeleteModal from '../misc/DeleteModal';
import PageTitle from '../misc/PageTitle';
import NoteModal from '../misc/NoteModal';

// Displays a single project in full detail
const Project = props => {
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [header] = useState({ headers: { AuthToken: localStorage.getItem('authToken') } });

    useEffect(() => {
        if (props.match.params.id) {
            // Get the project id that was passed in via route
            var id = props.match.params.id.toString();
            // Use axios to request the project info, redirect to 404 if there is an error
            // prettier-ignore
            axios.get(process.env.REACT_APP_BACKEND_LOC + 'projects/' + id, header).then(res => {
                setProject(res.data);
                setLoading(false);
            }).catch(() => history.push('/404'));
        }
    }, [props.match.params.id, header]);

    // Use props for project info if they exist (used mainly for Storybook support)
    useEffect(() => {
        setProject({
            id: 0,
            title: props.title,
            type: props.type,
            description: props.description,
            due: props.due,
            notes: []
        });
        setLoading(false);
    }, [props]);

    const deleteNote = note_id => {
        // prettier-ignore
        axios.delete(process.env.REACT_APP_BACKEND_LOC + 'projects/' + project.id + '/del_note/' + note_id, header).then(res => {
            console.log('Deleted Note');
            setLoading(true)
            history.go(0)
        }).catch(err => console.error('Error Note Object', err.message));
    };

    if (!loading) {
        return (
            <Fragment>
                <PageTitle title={project.title} />
                <Container fluid>
                    <Row>
                        <Col>
                            <h1>
                                {project.title} <small>(ID: {project.id})</small>
                            </h1>
                            <h2>
                                <small className="text-muted">{project.type}</small>
                            </h2>
                            <p className="lead">{project.description}</p>
                            <p>
                                <strong>Due:</strong> <Moment format="LLLL">{project.due}</Moment>
                            </p>

                            <hr />

                            <h3>Tasks</h3>
                            {project.id !== 0 ? <TaskList project_id={[project.id]} /> : <p className="lead">No tasks.</p>}

                            <hr />

                            <h3>Notes</h3>
                            <ListGroup>
                                {project.notes.length > 0 &&
                                    project.notes.map(note => {
                                        return (
                                            <ListGroup.Item key={note._id}>
                                                {note.text} {note._id}
                                                <span className="float-right">
                                                    <Link onClick={() => deleteNote(note._id)}>Delete</Link>
                                                </span>
                                            </ListGroup.Item>
                                        );
                                    })}
                                {project.notes.length === 0 && <p className="Lead">No notes available.</p>}
                            </ListGroup>

                            <hr />

                            <ButtonGroup aria-label="Project Options">
                                <Button variant="success" size="sm" onClick={() => setAddModalShow(!addModalShow)}>
                                    <Icon path={mdiPlus} size={0.8} color="white" /> Add Note
                                </Button>
                                <Button variant="info" size="sm" as={Link} to={'/projects/edit/' + props.match.params.id}>
                                    <Icon path={mdiPencil} size={0.8} color="white" /> Edit Project
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => setModalShow(!modalShow)}>
                                    <Icon path={mdiDelete} size={0.8} color="white" /> Delete Project
                                </Button>
                            </ButtonGroup>

                            <DeleteModal show={modalShow} onHide={() => setModalShow(!modalShow)} type="projects" id={project.id} />
                            <NoteModal show={addModalShow} onHide={() => setAddModalShow(!addModalShow)} id={project.id} />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    } else {
        return <Loading />;
    }
};

export default withRouter(Project);
