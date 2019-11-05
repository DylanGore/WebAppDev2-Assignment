import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleProject from './SimpleProject';

const ProjectList = () => {
    const [projects, setProjects] = useState(null);

    // Use axios to request the list of all projects
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_BACKEND_LOC + 'projects')
            .then(res => {
                setProjects(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="projectList">
            {projects &&
                projects.map(project => {
                    return <SimpleProject project={project} key={project.id} />;
                })}
            {!projects && <p className="Lead">No projects available.</p>}
        </div>
    );
};

export default ProjectList;
