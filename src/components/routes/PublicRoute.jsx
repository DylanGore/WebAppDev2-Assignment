import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../config/firebaseConfig';

const PublicRoute = ({ component, ...options }) => {
    // eslint-disable-next-line
    const [user] = useAuthState(firebase.auth());
    if (user) {
        return <Redirect to="/dashboard" />;
    }
    return <Route {...options} component={component} />;
};

export default PublicRoute;
