import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
// My Components
import Project from '../src/components/projects/Project';
import SimpleProject from '../src/components/projects/SimpleProject';
import ProjectList from '../src/components/projects/ProjectList';

const stories = storiesOf('Projects', module);

stories.addDecorator(StoryRouter());
stories.addDecorator(withKnobs);

stories.add('Project', () => {
    const title = text('Title', 'Sample Project');
    const type = text('Type', 'Example');
    const description = text(
        'Description',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis nulla felis, quis cursus felis pharetra ut. Quisque accumsan turpis et blandit pharetra.'
    );
    const due = text('Due', '1st December 2019');
    return <Project title={title} type={type} description={description} due={due} />;
});
stories.add('SimpleProject', () => {
    const id = text('ID', 'sb1');
    const title = text('Title', 'Sample Project');
    const type = text('Type', 'Example');
    const description = text(
        'Description',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum libero non volutpat laoreet.Praesent dignissim dapibus ex, et bibendum sem gravida varius. Pellentesque consequat odio at molestieplacerat. Curabitur sed aliquam lacus, non mollis ex. Quisque sed felis nec tortor ornare interdum.'
    );
    return <SimpleProject id={id} title={title} type={type} description={description} />;
});
stories.add('Project List', () => {
    return <ProjectList />;
});
