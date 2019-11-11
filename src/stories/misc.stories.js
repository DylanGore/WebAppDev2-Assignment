import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withKnobs, text } from '@storybook/addon-knobs';
// My Components
import DeleteModal from '../components/misc/DeleteModal';
import DisplayMessage from '../components/misc/DisplayMessage';

const stories = storiesOf('Miscellaneous', module);

stories.addDecorator(StoryRouter());
stories.addDecorator(withKnobs);

stories.add('Delete Item', () => {
    return <DeleteModal show={true} onHide={() => console.log('hide modal')} />;
});

stories.add('Display Message', () => {
    const message = text('Message Text', 'Storybook Example');
    return <DisplayMessage message={{ value: message, type: 'info' }} setMessage={null} />;
});
