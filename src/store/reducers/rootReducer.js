import authReducer from './authreducer';
import projectReducer from './projectReducer';
import { firestoreReducer } from 'redux-firestore'; // syncing firestore
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;
