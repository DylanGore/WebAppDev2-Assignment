import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../config/firebase';

// Wraps the standered Route compoent requiring only logged out users to display the intended component
// i.e. logged in users should not be able to visit the login page
const PublicRoute = ({ component, ...options }) => {
    const [user] = useAuthState(firebase.auth());
    if (user) {
        return <Redirect to="/dashboard" />;
    }
    return <Route {...options} component={component} />;
};

export default PublicRoute;
