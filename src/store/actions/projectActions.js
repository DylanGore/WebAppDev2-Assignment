export const addProject = project => {
    return (dispatch, getState, { getFirestore }) => {
        // Create project in db with Axios (async)
        // Use firestore for testing
        const fireStore = getFirestore();
        fireStore
            .collection('projects')
            .add({
                ...project,
                creationTimestamp: new Date()
            })
            .then(() => {
                dispatch({ type: 'ADD_PROJECT', project: project });
            })
            .catch(error => {
                dispatch({ type: 'ADD_PROJECT_ERROR', error });
            });
    };
};
