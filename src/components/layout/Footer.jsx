import React from 'react';
// import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
    return (
        <Navbar fixed="bottom" bg="dark" className="footer">
            <span className="mx-auto">&copy; Copyright 2019 Dylan Gore</span>
        </Navbar>
    );
};

export default Footer;
