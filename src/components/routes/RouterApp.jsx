import React from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import history from '../../config/history';

// Routes
import AuthRoute from './AuthRoute';
import PublicRoute from './PublicRoute';

// My Components
import NavbarApp from '../layout/NavbarApp';
import Footer from '../layout/Footer';
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Project from '../projects/Project';
import AddProject from '../projects/AddProject';
import NotFound from '../error/NotFound';
import Home from '../pages/Home';
import ResetPassword from '../auth/ForgotPassword';

function RouterApp() {
    return (
        <Router history={history}>
            <NavbarApp />
            <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/dashboard" component={Dashboard} />
                <AuthRoute exact path="/projects" component={Projects} />
                <AuthRoute exact path="/projects/add" component={AddProject} />
                <PublicRoute exact path="/login" component={Login} />
                <PublicRoute exact path="/register" component={Register} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <AuthRoute exact path="/projects/:id" component={Project} />
                <Route exact path="/404" component={NotFound} />
                <Route path="*">
                    <Redirect to="/404" />
                </Route>
            </Switch>

            <Footer />
        </Router>
    );
}

export default RouterApp;