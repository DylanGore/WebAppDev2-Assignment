import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Loading from '../layout/Loading';

const TaskList = ({ project_id, limit }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (project_id) {
            axios
                .get(process.env.REACT_APP_BACKEND_LOC + 'tasks?project=' + project_id)
                .then(res => {
                    setTasks(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            var url = '';
            if (limit && limit !== 0) {
                url = process.env.REACT_APP_BACKEND_LOC + 'tasks?start=0&_limit=' + limit;
            } else {
                url = process.env.REACT_APP_BACKEND_LOC + 'tasks';
            }

            axios
                .get(url)
                .then(res => {
                    setTasks(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }, [project_id, limit]);

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

    if (!loading) {
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
                                    <span className="float-right">
                                        <Link to={'/tasks/' + task.id}>View</Link>
                                    </span>
                                </ListGroup.Item>
                            );
                        })}
                    {tasks.length === 0 && <p className="Lead">No tasks available.</p>}
                </ListGroup>
            </Fragment>
        );
    } else {
        return <Loading />;
    }
};

export default TaskList;
