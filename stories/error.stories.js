import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
// My Components
import NotFound from '../src/components/error/NotFound';
import Unauthorized from '../src/components/error/Unauthorized';

const stories = storiesOf('Error Pages', module);

stories.addDecorator(StoryRouter());

stories.add('401 - Unauthorized', () => {
    return <Unauthorized />;
});
stories.add('404 - Not Found', () => {
    return <NotFound />;
});
