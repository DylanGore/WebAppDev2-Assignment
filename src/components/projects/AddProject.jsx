import React, { Component } from 'react';
import { addProject } from '../../store/actions/projectActions';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddProject extends Component {
    state = {
        title: '',
        type: '',
        description: '',
        due: ''
    };

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.addProject(this.state);
    };

    render() {
        return (
            <Container fluid>
                <Row className="justify-content-center text-center">
                    <Col>
                        <h1>Add a new Project</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6} sm={12}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label>Project Title:</Form.Label>
                                <Form.Control type="text" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="type">
                                <Form.Label>Type:</Form.Label>
                                <Form.Control type="text" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control as="textarea" rows="3" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="due">
                                <Form.Label>Due:</Form.Label>
                                <Form.Control type="text" onChange={this.handleChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Add Project
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProject: project => dispatch(addProject(project))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(AddProject);
