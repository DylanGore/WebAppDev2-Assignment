import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import history from '../../config/history';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskList from '../tasks/TaskList';
const Project = props => {
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.match.params.id) {
            // Get the project id that was passed in via route
            var id = props.match.params.id.toString();
            // Use axios to request the project info, redirect to 404 if there is an error
            axios
                .get(process.env.REACT_APP_BACKEND_LOC + 'projects/' + id)
                .then(res => {
                    setProject(res.data);
                })
                .catch(() => {
                    history.push('/404');
                });
            setLoading(false);
        }
    }, [props.match.params.id]);

    // Use props for project info if they exist (used mainly for Storybook support)
    useEffect(() => {
        setProject({
            id: 0,
            title: props.title,
            type: props.type,
            description: props.description,
            due: props.due
        });
        setLoading(false);
    }, [props]);

    return (
        <Container fluid>
            {!loading && (
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
                            <strong>Due:</strong> {project.due}
                        </p>
                        <h3>Tasks</h3>
                        {project.id !== 0 && <TaskList project_id={[project.id]} />}
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default withRouter(Project);
