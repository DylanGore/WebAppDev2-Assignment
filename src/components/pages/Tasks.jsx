import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskList from '../tasks/TaskList';
const Tasks = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Tasks</h1>
                    <Link to="/tasks/add">Add Task</Link>
                    <TaskList />
                </Col>
            </Row>
        </Container>
    );
};

export default Tasks;
