import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import history from '../../config/history';

const DeleteModal = props => {
    const handleClose = () => {
        props.onHide();
    };

    const handleDelete = () => {
        Axios.delete(process.env.REACT_APP_BACKEND_LOC + props.type + '/' + props.id)
            .then(res => {
                console.log('Deleted Object');
            })
            .catch(err => console.log('Error Deleting Object: ' + err.message));
        props.onHide();
        history.push('/');
    };

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please confirm that you want to delete this item.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
