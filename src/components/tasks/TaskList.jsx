import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

const TaskList = ({ project_id }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (project_id) {
            axios
                .get(process.env.REACT_APP_BACKEND_LOC + 'tasks?project=' + project_id)
                .then(res => {
                    console.log(res.data);
                    setTasks(res.data);
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            setTasks([{ id: 0, project: 0, description: 'Example Task', due: 'timestamp' }]);
        }
    }, [project_id]);

    const getTaskColor = task => {
        switch (task.state) {
            case 'complete':
                return 'success';
            case 'in_progress':
                return 'info';
            case 'overdue':
                return 'danger';
            case 'future':
                return 'primary';
            default:
                return 'secondary';
        }
    };

    return (
        <Fragment>
            <ListGroup>
                {tasks.length > 0 &&
                    tasks.map(task => {
                        return (
                            <ListGroup.Item
                                key={task.id}
                                disabled={task.state === 'complete'}
                                variant={getTaskColor(task)}
                            >
                                {task.description}
                            </ListGroup.Item>
                        );
                    })}
                {tasks.length === 0 && <p className="Lead">No tasks available.</p>}
            </ListGroup>
        </Fragment>
    );
};

export default TaskList;
