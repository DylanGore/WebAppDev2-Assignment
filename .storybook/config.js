import { configure } from '@storybook/react';
import '../src/app.scss';
import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
    // Use dark theme
    options: {
        theme: themes.dark
    },
    // Add a list of responsive viewports for testing
    viewport: {
        viewports: INITIAL_VIEWPORTS
    }
});

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
