import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

// Displays basic info on a single project
const SimpleProject = props => {
    const currProject = props.project;
    return (
        <Card body className="simpleProject">
            <Card.Title>{currProject.title}</Card.Title>
            <Card.Subtitle>{currProject.type}</Card.Subtitle>
            <Card.Text>{currProject.description}</Card.Text>
            <Card.Link as={Link} to={'/projects/' + currProject.id}>
                View Project
            </Card.Link>
        </Card>
    );
};

export default SimpleProject;
