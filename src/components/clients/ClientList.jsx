import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

const ClientList = ({ limit }) => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        var url = '';
        if (limit && limit !== 0) {
            url = process.env.REACT_APP_BACKEND_LOC + 'clients?start=0&_limit=' + limit;
        } else {
            url = process.env.REACT_APP_BACKEND_LOC + 'clients';
        }

        axios
            .get(url)
            .then(res => {
                setClients(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [limit]);

    return (
        <Fragment>
            <ListGroup>
                {clients.length > 0 &&
                    clients.map(client => {
                        return (
                            <ListGroup.Item key={client.id}>
                                {client.name} (E: {client.email} P: {client.phone})
                            </ListGroup.Item>
                        );
                    })}
                {clients.length === 0 && <p className="Lead">No clients available.</p>}
            </ListGroup>
        </Fragment>
    );
};

export default ClientList;
