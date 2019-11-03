import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectList from '../projects/ProjectList';

class Dashboard extends Component {
    render() {
        const projects = this.props.projects;
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Dashboard</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={12}>
                        <h2>Active Projects</h2>
                        <ProjectList projects={projects} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Dashboard;
