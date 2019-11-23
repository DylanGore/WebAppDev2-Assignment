import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleProject from './SimpleProject';
import Loading from '../layout/Loading';

// Lists projects, either all of them or a limited number
const ProjectList = ({ limit }) => {
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);

    // Use axios to request the list of all projects
    useEffect(() => {
        var url = '';
        if (limit && limit !== 0) {
            url = process.env.REACT_APP_BACKEND_LOC + 'projects?start=0&_limit=' + limit;
        } else {
            url = process.env.REACT_APP_BACKEND_LOC + 'projects';
        }

        // prettier-ignore
        // Get projects
        axios.get(url).then(res => {
            setProjects(res.data);
            setLoading(false);
        }).catch(err =>  console.error('Error getting projects', err.message));
    }, [limit]);

    if (!loading) {
        return (
            <div className="projectList">
                {projects &&
                    projects.map(project => {
                        return <SimpleProject project={project} key={project.id} />;
                    })}
                {!projects && <p className="Lead">No projects available.</p>}
            </div>
        );
    } else {
        return <Loading />;
    }
};

export default ProjectList;
