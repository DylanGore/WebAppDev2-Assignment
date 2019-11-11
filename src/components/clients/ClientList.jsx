import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Icon from '@mdi/react';
import { mdiCellphone, mdiEmail } from '@mdi/js';
import Loading from '../layout/Loading';

// Lists clients, either all of them or a limited number
const ClientList = ({ limit }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set url based on if a limit prop was passed to the component
        var url = '';
        if (limit && limit !== 0) {
            url = process.env.REACT_APP_BACKEND_LOC + 'clients?start=0&_limit=' + limit;
        } else {
            url = process.env.REACT_APP_BACKEND_LOC + 'clients';
        }

        // prettier-ignore
        // Get list of clients
        axios.get(url).then(res => {
            setClients(res.data);
            setLoading(false);
        }).catch(err => console.error('Error getting clients', err.message));
    }, [limit]);

    if (!loading) {
        return (
            <Fragment>
                <ListGroup>
                    {clients.length > 0 &&
                        clients.map(client => {
                            return (
                                <ListGroup.Item key={client.id}>
                                    {client.name}
                                    <br />
                                    <Icon path={mdiEmail} size={1} /> {client.email} <br />
                                    <Icon path={mdiCellphone} size={0.8} /> {client.phone ? client.phone : 'No Phone'}
                                    <br />
                                    <Link to={'/clients/' + client.id}>Manage Client</Link>
                                </ListGroup.Item>
                            );
                        })}
                    {clients.length === 0 && <p className="Lead">No clients available.</p>}
                </ListGroup>
            </Fragment>
        );
    } else {
        return <Loading />;
    }
};

export default ClientList;
