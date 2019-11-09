import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import history from '../../config/history';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Loading from '../layout/Loading';
import Icon from '@mdi/react';
import { mdiPencil, mdiDelete } from '@mdi/js';
import DeleteModal from '../misc/DeleteModal';
const Client = props => {
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (props.match.params.id) {
            // Get the project id that was passed in via route
            var id = props.match.params.id.toString();
            // Use axios to request the project info, redirect to 404 if there is an error
            axios
                .get(process.env.REACT_APP_BACKEND_LOC + 'clients/' + id)
                .then(res => {
                    setClient(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    history.push('/404');
                });
        }
    }, [props.match.params.id]);

    // Use props for project info if they exist (used mainly for Storybook support)
    useEffect(() => {
        setClient({
            id: 0,
            name: props.name,
            phone: props.phone,
            email: props.email
        });
        setLoading(false);
    }, [props]);

    if (!loading) {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Client: {client.name}</h1>
                        <ul>
                            <li>
                                <strong>ID:</strong> {client.id}
                            </li>
                            <li>
                                <strong>E-Mail:</strong> {client.email}
                            </li>
                            <li>
                                <strong>Phone:</strong> {client.phone ? client.phone : 'No Phone'}
                            </li>
                        </ul>

                        <ButtonGroup aria-label="Client Options">
                            <Button variant="info" size="sm" as={Link} to={'/clients/edit/' + props.match.params.id}>
                                <Icon path={mdiPencil} size={0.8} color="white" /> Edit Client
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => setModalShow(!modalShow)}>
                                <Icon path={mdiDelete} size={0.8} color="white" /> Delete Client
                            </Button>
                        </ButtonGroup>

                        <DeleteModal
                            show={modalShow}
                            onHide={() => setModalShow(!modalShow)}
                            type="clients"
                            id={client.id}
                        />
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return <Loading />;
    }
};

export default withRouter(Client);
