import React, { useState, useEffect, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import history from '../../config/history';
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Loading from '../layout/Loading';
import Icon from '@mdi/react';
import { mdiPencil, mdiDelete } from '@mdi/js';
import DeleteModal from '../misc/DeleteModal';
import PageTitle from '../misc/PageTitle';
const Task = props => {
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (props.match.params.id) {
            // Get the project id that was passed in via route
            var id = props.match.params.id.toString();
            // Use axios to request the project info, redirect to 404 if there is an error
            axios
                .get(process.env.REACT_APP_BACKEND_LOC + 'tasks/' + id)
                .then(res => {
                    setTask(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    history.push('/404');
                });
        }
    }, [props.match.params.id]);

    // Use props for project info if they exist (used mainly for Storybook support)
    useEffect(() => {
        setTask({
            id: 0,
            description: props.description,
            due: props.due
        });
        setLoading(false);
    }, [props]);

    if (!loading) {
        return (
            <Fragment>
                <PageTitle title={'Task ' + task.id} />
                <Container fluid>
                    <Row>
                        <Col>
                            <h1>
                                Task <small>(ID: {task.id})</small>
                            </h1>
                            <p className="lead">{task.description}</p>
                            <p>
                                <strong>Due:</strong> <Moment format="LLLL">{task.due}</Moment>
                            </p>

                            <ButtonGroup aria-label="Task Options">
                                <Button variant="info" size="sm" as={Link} to={'/tasks/edit/' + props.match.params.id}>
                                    <Icon path={mdiPencil} size={0.8} color="white" /> Edit Task
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => setModalShow(!modalShow)}>
                                    <Icon path={mdiDelete} size={0.8} color="white" /> Delete Task
                                </Button>
                            </ButtonGroup>

                            <DeleteModal
                                show={modalShow}
                                onHide={() => setModalShow(!modalShow)}
                                type="tasks"
                                id={task.id}
                            />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    } else {
        return <Loading />;
    }
};

export default withRouter(Task);
