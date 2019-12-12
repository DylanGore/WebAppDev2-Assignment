import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import history from '../../config/history';
import Form from 'react-bootstrap/Form';

// Deletes a specified object, prompting the user for confirmation before doing so
const NoteModal = props => {
    const [header] = useState({ headers: { AuthToken: localStorage.getItem('authToken') } });
    const [note, setNote] = useState({});

    // Save any changes in form to state
    const handleChange = e => {
        setNote({
            ...note,
            [e.target.id]: e.target.value
        });
    };

    // Call the onHide function when the cancel button is pressed to hide the dialog from the page
    const handleClose = () => {
        props.onHide();
    };

    // Delete the object and change page to homepage after
    const handleAdd = () => {
        // prettier-ignore
        axios.post(`${process.env.REACT_APP_BACKEND_LOC}projects/${props.id}/new_note`, note, header).then(res =>{
            console.info('Added Note')
            history.go(0)
        }).catch(err => console.error(err.message));

        props.onHide();
    };

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="text">
                        <Form.Label>Text:</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={handleChange} value={note.text} required />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="info" onClick={handleAdd}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NoteModal;
