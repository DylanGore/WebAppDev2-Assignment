import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectList from '../projects/ProjectList';
class Projects extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Projects</h1>
                        <Link to="/projects/add">Add Project</Link>
                        <ProjectList projects={this.props.projects} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        projects: state.firestore.ordered.projects
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'projects' }])
)(Projects);
