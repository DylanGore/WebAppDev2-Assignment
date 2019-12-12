import React from 'react';
import Alert from 'react-bootstrap/Alert';

// Handle displaying error/status messages to the user, used for forms
const DisplayMessage = props => {
    return (
        <Alert variant={props.message.type} onClose={() => props.setMessage(null)} dismissible>
            {props.message.value}
        </Alert>
    );
};

export default DisplayMessage;
