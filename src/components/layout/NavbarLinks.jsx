import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const PublicLinks = () => {
    return (
        <Nav.Link as={Link} to="/">
            Home
        </Nav.Link>
    );
};

export default PublicLinks;
