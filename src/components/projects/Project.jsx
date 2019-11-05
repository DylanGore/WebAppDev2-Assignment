import React, { useState, useEffect, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import history from '../../config/history';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
const Project = props => {
    const [project, setProject] = useState({});

    useEffect(() => {
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
    }, [props.match.params.id]);

    return (
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
                        <strong>Due:</strong> {project.due}
                    </p>
                    <h3>Tasks</h3>
                    <ListGroup>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default withRouter(Project);
