import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import AddEditClient from '../components/clients/AddEditClient';
import ClientList from '../components/clients/ClientList';
// My Components

const stories = storiesOf('Clients', module);

stories.addDecorator(StoryRouter());
stories.addDecorator(withKnobs);

stories.add('Add/Edit Client', () => {
    return <AddEditClient />;
});
stories.add('Client List', () => {
    const limit = number('Limit', 0);
    return <ClientList limit={limit} />;
});
