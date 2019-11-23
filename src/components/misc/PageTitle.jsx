import React from 'react';
import Helmet from 'react-helmet';

// Allows the title to be different for each page, set via props
const PageTitle = ({ title }) => {
    var defaultTitle = 'Project Manager';
    return (
        <Helmet>
            {/* Example Format: Dashboard | Project Manager */}
            <title>{title ? title + ' | ' + defaultTitle : defaultTitle}</title>
        </Helmet>
    );
};

export default PageTitle;
