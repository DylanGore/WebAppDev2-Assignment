import React from 'react';
import Helmet from 'react-helmet';

const PageTitle = ({ title }) => {
    var defaultTitle = 'Project Manager';
    return (
        <Helmet>
            <title>{title ? title + ' | ' + defaultTitle : defaultTitle}</title>
        </Helmet>
    );
};

export default PageTitle;
