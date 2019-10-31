import React, { Fragment } from 'react';
import Col from 'react-bootstrap/Col';
import SimpleProject from './SimpleProject';
const ProjectList = () => {
    // Sample Data
    const title = 'Sample Project';
    const type = 'Example';
    const description =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum libero non volutpat laoreet. Praesent dignissim dapibus ex, et bibendum sem gravida varius. Pellentesque consequat odio at molestie placerat. Curabitur sed aliquam lacus, non mollis ex. Quisque sed felis nec tortor ornare interdum.';

    return (
        <Fragment>
            <SimpleProject id="1" title={title} type={type} description={description} />
            <SimpleProject id="2" title={title} type={type} description={description} />
            <SimpleProject id="3" title={title} type={type} description={description} />
        </Fragment>
    );
};

export default ProjectList;
