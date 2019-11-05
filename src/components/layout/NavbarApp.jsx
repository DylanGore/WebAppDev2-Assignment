import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../config/history';
import firebase from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Icon from '@mdi/react';
import { mdiViewDashboardVariant, mdiLoginVariant, mdiLogoutVariant } from '@mdi/js';
// Navbar Links
import NavbarLinks from './NavbarLinks';

const NavbarApp = () => {
    const [user] = useAuthState(firebase.auth());
    const logout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('Signed user out!');
                history.push('/login');
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const SelectNavbarLinks = () => {
        return user ? <NavbarLinks /> : null;
    };

    const DisplayUserLinks = () => {
        if (user) {
            return (
                <Nav.Link onClick={logout}>
                    <Icon path={mdiLogoutVariant} size={1} color="white" /> Log out
                </Nav.Link>
            );
        } else {
            return (
                <Nav.Link as={Link} to="/login">
                    <Icon path={mdiLoginVariant} size={1} color="white" /> Log In
                </Nav.Link>
            );
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">
                <Icon path={mdiViewDashboardVariant} size={1} color="white" />
                &nbsp;Project Manager
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">
                        Home
                    </Nav.Link>
                    <SelectNavbarLinks />
                </Nav>
                <Nav className="ml-auto">
                    <DisplayUserLinks />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default NavbarApp;
