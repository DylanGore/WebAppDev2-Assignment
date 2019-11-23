import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { mdiPlus } from '@mdi/js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectList from '../projects/ProjectList';
import TaskList from '../tasks/TaskList';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import PageTitle from '../misc/PageTitle';

// Main dashboard, lists projects and tasks and options to view more info/add each
const Dashboard = () => {
    return (
        <Fragment>
            <PageTitle title="Dashboard" />
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Dashboard</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} sm={12}>
                        <h2>Projects</h2>
                        <Button className="mb-2" as={Link} to="/projects/add" variant="primary" size="sm">
                            <Icon path={mdiPlus} size={1} color="white" />
                            Add Project
                        </Button>
                        <ProjectList limit={2} />
                    </Col>
                    <Col md={6} sm={12}>
                        <h2>Tasks</h2>
                        <Button className="mb-2" as={Link} to="/tasks/add" variant="primary" size="sm">
                            <Icon path={mdiPlus} size={1} color="white" />
                            Add Task
                        </Button>
                        <TaskList limit={6} />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Dashboard;
