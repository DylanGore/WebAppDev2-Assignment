import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Dashboard extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Dashboard</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Dashboard;
