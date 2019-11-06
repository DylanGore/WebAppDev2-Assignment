import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleProject from './SimpleProject';

const ProjectList = ({ limit }) => {
    const [projects, setProjects] = useState(null);

    // Use axios to request the list of all projects
    useEffect(() => {
        var url = '';
        if (limit && limit !== 0) {
            url = process.env.REACT_APP_BACKEND_LOC + 'projects?start=0&_limit=' + limit;
        } else {
            url = process.env.REACT_APP_BACKEND_LOC + 'projects';
        }

        axios
            .get(url)
            .then(res => {
                setProjects(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [limit]);

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
