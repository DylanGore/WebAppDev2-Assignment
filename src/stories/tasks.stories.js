import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import TaskList from '../components/tasks/TaskList';
import AddEditTask from '../components/tasks/AddEditTask';
// My Components

const stories = storiesOf('Tasks', module);

stories.addDecorator(StoryRouter());
stories.addDecorator(withKnobs);

stories.add('Add/Edit Task', () => {
    return <AddEditTask />;
});
stories.add('Task List', () => {
    const project = number('Project ID', 1);
    const limit = number('Limit', 0);
    return <TaskList project_id={project} limit={limit} />;
});
