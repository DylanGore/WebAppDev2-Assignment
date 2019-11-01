const initialState = {
    projects: [
        { id: '1', title: 'Project 1', type: 'Example', description: 'Project description', due: '1st December 2019' },
        { id: '2', title: 'Project 2', type: 'Example', description: 'Project description', due: '1st December 2019' },
        { id: '3', title: 'Project 3', type: 'Example', description: 'Project description', due: '1st December 2019' }
    ]
};

const projectReducer = (state = initialState, action) => {
    return state;
};

export default projectReducer;
