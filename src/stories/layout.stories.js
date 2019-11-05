import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
// My Components
import NavbarApp from '../components/layout/NavbarApp';
import NavbarLinks from '../components/layout/NavbarLinks';
import Footer from '../components/layout/Footer';
import Loading from '../components/layout/Loading';

const stories = storiesOf('Layout', module);

stories.addDecorator(StoryRouter());

stories.add('Navbar', () => {
    return <NavbarApp />;
});
stories.add('Navbar Links', () => {
    return <NavbarLinks />;
});
stories.add('Footer', () => {
    return <Footer />;
});
stories.add('Loading Icon', () => {
    return <Loading />;
});
