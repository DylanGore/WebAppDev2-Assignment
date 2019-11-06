import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import TaskList from '../components/tasks/TaskList';
// My Components

const stories = storiesOf('Tasks', module);

stories.addDecorator(StoryRouter());
stories.addDecorator(withKnobs);

stories.add('Task List', () => {
    const project = number('Project ID', 1);
    return <TaskList project_id={project} />;
});
