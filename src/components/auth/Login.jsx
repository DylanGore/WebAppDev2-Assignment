import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends Component {
    state = {
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
                        <h1>Login</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6} sm={12}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>E-mail address:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="example@example.com"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={this.handleChange} />
                            </Form.Group>

                            <p className="text-muted">
                                Haven't got an account yet? Click <Link to="/register">here</Link> to register.
                            </p>

                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;
