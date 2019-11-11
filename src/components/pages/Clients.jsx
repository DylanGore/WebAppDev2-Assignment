import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Icon from '@mdi/react';
import { mdiAccountPlus } from '@mdi/js';
import ClientList from '../clients/ClientList';
import PageTitle from '../misc/PageTitle';

// Lists clients
const Clients = () => {
    return (
        <Fragment>
            <PageTitle title="Clients" />
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Clients</h1>
                        <Button variant="primary" size="sm" as={Link} to="/clients/add/" className="my-2">
                            <Icon path={mdiAccountPlus} size={0.8} color="white" /> Add Client
                        </Button>
                        <ClientList />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Clients;
