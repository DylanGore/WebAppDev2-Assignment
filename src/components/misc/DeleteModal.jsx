import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import history from '../../config/history';

// Deletes a specified object, prompting the user for confirmation before doing so
const DeleteModal = props => {
    // Call the onHide function when the cancel button is pressed to hide the dialog from the page
    const handleClose = () => {
        props.onHide();
    };

    // Delete the object and change page to homepage after
    const handleDelete = () => {
        // prettier-ignore
        axios.delete(process.env.REACT_APP_BACKEND_LOC + props.type + '/' + props.id).then(res => {
            console.log('Deleted Object');
        }).catch(err => console.error('Error Deleting Object', err.message));
        // Call the onHide function to hide the dialog
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
