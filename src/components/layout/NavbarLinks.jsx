import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const PublicLinks = () => {
    return (
        <Fragment>
            <Nav.Link as={Link} to="/">
                Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">
                Dashboard
            </Nav.Link>
        </Fragment>
    );
};

export default PublicLinks;
