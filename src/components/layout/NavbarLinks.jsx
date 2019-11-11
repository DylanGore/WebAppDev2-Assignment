import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

// Links for logged in users only
const NavbarLinks = () => {
    return (
        <Fragment>
            <Nav.Link as={Link} to="/dashboard">
                Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/projects">
                Projects
            </Nav.Link>
            <Nav.Link as={Link} to="/tasks">
                Tasks
            </Nav.Link>
            <Nav.Link as={Link} to="/clients">
                Clients
            </Nav.Link>
        </Fragment>
    );
};

export default NavbarLinks;
