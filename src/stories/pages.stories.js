import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
// My Components
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';
import Projects from '../components/pages/Projects';
import Clients from '../components/pages/Clients';
import Tasks from '../components/pages/Tasks';

const stories = storiesOf('Pages', module);

stories.addDecorator(StoryRouter());

stories.add('Home', () => {
    return <Home />;
});
stories.add('Dashboard', () => {
    return <Dashboard />;
});
stories.add('Projects', () => {
    return <Projects />;
});
stories.add('Tasks', () => {
    return <Tasks />;
});
stories.add('Clients', () => {
    return <Clients />;
});
