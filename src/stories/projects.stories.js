import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
// My Components
import Project from '../components/projects/Project';
import SimpleProject from '../components/projects/SimpleProject';
import ProjectList from '../components/projects/ProjectList';
import AddEditProject from '../components/projects/AddEditProject';

const stories = storiesOf('Projects', module);

stories.addDecorator(StoryRouter());
stories.addDecorator(withKnobs);

stories.add('Add/Edit Project', () => {
    return <AddEditProject />;
});

stories.add('Project', () => {
    const title = text('Title', 'Sample Project');
    const type = text('Type', 'Example');
    const description = text('Description', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis nulla felis, quis cursus felis pharetra ut. Quisque accumsan turpis et blandit pharetra.');
    const due = text('Due', '2019-11-01T23:59:00.000Z');
    return <Project title={title} type={type} description={description} due={due} />;
});

stories.add('SimpleProject', () => {
    const id = number('ID', 1);
    const title = text('Title', 'Sample Project');
    const type = text('Type', 'Example');
    const description = text(
        'Description',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum libero non volutpat laoreet.Praesent dignissim dapibus ex, et bibendum sem gravida varius. Pellentesque consequat odio at molestieplacerat. Curabitur sed aliquam lacus, non mollis ex. Quisque sed felis nec tortor ornare interdum.'
    );

    const project = { id: id, title: title, type: type, description: description };
    return <SimpleProject project={project} />;
});

stories.add('Project List', () => {
    const limit = number('Project Limit', 0);
    return <ProjectList limit={limit} />;
});
