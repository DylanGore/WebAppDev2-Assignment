import React from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
const Project = props => {
    console.log(props);
    var projectId = props.match.params.id;
    // Display dummy ID if viewing component in Storybook
    if (props.match.params.id == null) {
        projectId = 'sb1';
    }
    var title = props.title;
    var type = props.type;
    var description = props.description;
    var due = props.due;
    // projectId.propTypes = {
    //     match: PropTypes.object
    // };
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>
                        {title} <small>(ID: {projectId})</small>
                    </h1>
                    <h2>
                        <small className="text-muted">{type}</small>
                    </h2>
                    <p className="lead">{description}</p>
                    <p>
                        <strong>Due:</strong> {due}
                    </p>
                    <h3>Tasks</h3>
                    <ListGroup>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default withRouter(Project);
