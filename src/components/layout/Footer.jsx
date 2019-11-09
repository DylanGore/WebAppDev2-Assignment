import React from 'react';
import Icon from '@mdi/react';
import { mdiGithubCircle } from '@mdi/js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Footer = () => {
    const githubLink = 'https://github.com/DylanGore/WebAppDev2-Assignment';

    return (
        <Container className="footer" fluid>
            <Row className="my-auto">
                <Col></Col>
                <Col>&copy; Copyright 2019 Dylan Gore</Col>
                <Col>
                    <a href={githubLink} title="View Source Code" target="_">
                        <Button size="sm" variant="dark" className="float-right">
                            <Icon path={mdiGithubCircle} size={0.8} color="white" />
                        </Button>
                    </a>
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;
