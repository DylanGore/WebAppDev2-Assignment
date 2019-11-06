import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import AddClient from '../components/clients/AddClient';
import ClientList from '../components/clients/ClientList';
// My Components

const stories = storiesOf('Clients', module);

stories.addDecorator(StoryRouter());
stories.addDecorator(withKnobs);

stories.add('Add Client', () => {
    return <AddClient />;
});
stories.add('Client List', () => {
    const limit = number('Limit', 0);
    return <ClientList limit={limit} />;
});
