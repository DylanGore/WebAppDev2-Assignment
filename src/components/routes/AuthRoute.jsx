import React from 'react';
import { Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../config/firebase';
import Unauthorized from '../error/Unauthorized';

// Wraps the standered Route compoent requiring only logged in users to display the intended component
const AuthRoute = ({ component, ...options }) => {
    const [user] = useAuthState(firebase.auth());
    const finalComponent = user ? component : Unauthorized;
    return <Route {...options} component={finalComponent} />;
};

export default AuthRoute;
