import React, { Fragment } from 'react';
import SimpleProject from './SimpleProject';

const ProjectList = props => {
    const projects = props.projects;
    return (
        <Fragment>
            {projects &&
                projects.map(project => {
                    return <SimpleProject project={project} key={project.id} />;
                })}
        </Fragment>
    );
};

export default ProjectList;
