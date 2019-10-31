import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const SimpleProject = props => {
    var id = props.id;
    var title = props.title;
    var type = props.type;
    var description = props.description;
    return (
        <Card body className="simpleProject">
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{type}</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Card.Link as={Link} to={'/projects/' + id}>
                View Project
            </Card.Link>
        </Card>
    );
};

export default SimpleProject;
