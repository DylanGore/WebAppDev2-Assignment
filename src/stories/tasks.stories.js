import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import TaskList from '../components/tasks/TaskList';
import AddTask from '../components/tasks/AddTask';
// My Components

const stories = storiesOf('Tasks', module);

stories.addDecorator(StoryRouter());
stories.addDecorator(withKnobs);

stories.add('Add Task', () => {
    return <AddTask />;
});
stories.add('Task List', () => {
    const project = number('Project ID', 1);
    const limit = number('Limit', 0);
    return <TaskList project_id={project} limit={limit} />;
});
