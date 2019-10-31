import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
// My Components
import Dashboard from '../src/components/pages/Dashboard';

const stories = storiesOf('Pages', module);

stories.addDecorator(StoryRouter());

stories.add('Dashboard', () => {
    return <Dashboard />;
});
