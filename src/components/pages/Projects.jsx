import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectList from '../projects/ProjectList';

class Projects extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Projects</h1>
                        <ProjectList />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Projects;
