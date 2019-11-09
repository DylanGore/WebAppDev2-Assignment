import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
// My Components
import DeleteModal from '../components/misc/DeleteModal';

const stories = storiesOf('Miscellaneous', module);

stories.addDecorator(StoryRouter());

stories.add('Delete Item', () => {
    return <DeleteModal show={true} onHide={() => console.log('hide modal')} />;
});
