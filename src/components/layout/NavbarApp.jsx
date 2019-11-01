import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Icon from '@mdi/react';
import { mdiViewDashboardVariant } from '@mdi/js';
// Navbar Links
import NavbarLinks from './NavbarLinks';

const NavbarApp = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">
                <Icon path={mdiViewDashboardVariant} size={1} color="white" />
                &nbsp;Project Manager
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavbarLinks />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default NavbarApp;
