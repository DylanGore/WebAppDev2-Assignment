import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiFolderPlus } from '@mdi/js';
import ProjectList from '../projects/ProjectList';
import PageTitle from '../misc/PageTitle';

// Lists projects
const Projects = props => {
    return (
        <Fragment>
            <PageTitle title="Projects" />
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Projects</h1>
                        <Button variant="primary" size="sm" as={Link} to="/projects/add/" className="my-2">
                            <Icon path={mdiFolderPlus} size={0.8} color="white" /> Add Project
                        </Button>
                        <ProjectList projects={props.projects} />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Projects;
