const initialState = {
    projects: [
        { id: '1', title: 'Project 1', type: 'Example', description: 'Project description', due: '1st December 2019' },
        { id: '2', title: 'Project 2', type: 'Example', description: 'Project description', due: '1st December 2019' },
        { id: '3', title: 'Project 3', type: 'Example', description: 'Project description', due: '1st December 2019' }
    ]
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT':
            // TODO add to db
            console.log('Created Project', action.project);
            break;
        case 'ADD_PROJECT_ERROR':
            console.log('Error while creating project', action.error);
            break;
        default:
            console.log('Invalid Action');
    }
    return state;
};

export default projectReducer;
