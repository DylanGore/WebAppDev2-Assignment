import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Register extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
    };

    render() {
        return (
            <Container fluid>
                <Row className="justify-content-center text-center">
                    <Col>
                        <h1>Register</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6} sm={12}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control type="text" placeholder="Alias" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type="text" placeholder="Fakename" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" placeholder="afakename" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>E-mail address:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="afakename@example.com"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={this.handleChange} />
                            </Form.Group>

                            <p className="text-muted">
                                Already have an account? Click <Link to="/login">here</Link> to login.
                            </p>

                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Register;
