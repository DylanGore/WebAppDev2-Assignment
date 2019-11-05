import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
// My Components
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';
import Projects from '../components/pages/Projects';

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
