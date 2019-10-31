import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
// My Components
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';

const stories = storiesOf('Authentication', module);

stories.addDecorator(StoryRouter());

stories.add('Login', () => {
    return <Login />;
});
stories.add('Register', () => {
    return <Register />;
});
