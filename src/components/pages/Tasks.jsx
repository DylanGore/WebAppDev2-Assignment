import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiPlaylistPlus } from '@mdi/js';
import TaskList from '../tasks/TaskList';
const Tasks = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Tasks</h1>
                    <Button variant="primary" size="sm" as={Link} to="/projects/add/" className="my-2">
                        <Icon path={mdiPlaylistPlus} size={0.8} color="white" /> Add Task
                    </Button>
                    <TaskList />
                </Col>
            </Row>
        </Container>
    );
};

export default Tasks;
