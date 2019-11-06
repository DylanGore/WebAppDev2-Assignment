import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ClientList from '../clients/ClientList';
const Clients = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Clients</h1>
                    <Link to="/clients/add">Add Client</Link>
                    <ClientList />
                </Col>
            </Row>
        </Container>
    );
};

export default Clients;
