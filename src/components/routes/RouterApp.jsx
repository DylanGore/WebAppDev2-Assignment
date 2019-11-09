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
import Tasks from '../pages/Tasks';
import Clients from '../pages/Clients';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Project from '../projects/Project';
import AddEditProject from '../projects/AddEditProject';
import NotFound from '../error/NotFound';
import Home from '../pages/Home';
import ResetPassword from '../auth/ForgotPassword';
import AddEditTask from '../tasks/AddEditTask';
import AddEditClient from '../clients/AddEditClient';
import Task from '../tasks/Task';
import Client from '../clients/Client';

function RouterApp() {
    return (
        <Router history={history}>
            <NavbarApp />
            <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/dashboard" component={Dashboard} />
                <AuthRoute exact path="/projects" component={Projects} />
                <AuthRoute exact path="/projects/add" component={AddEditProject} />
                <AuthRoute exact path="/clients/add" component={AddEditClient} />
                <AuthRoute exact path="/projects/edit/:id" component={AddEditProject} />
                <AuthRoute exact path="/tasks" component={Tasks} />
                <AuthRoute exact path="/tasks/add" component={AddEditTask} />
                <AuthRoute exact path="/tasks/edit/:id" component={AddEditTask} />
                <AuthRoute exact path="/clients" component={Clients} />
                <AuthRoute exact path="/clients/:id" component={Client} />
                <AuthRoute exact path="/clients/edit/:id" component={AddEditClient} />
                <PublicRoute exact path="/login" component={Login} />
                <PublicRoute exact path="/register" component={Register} />
                <Route exact path="/reset-password" component={ResetPassword} />
                <AuthRoute exact path="/projects/:id" component={Project} />
                <AuthRoute exact path="/tasks/:id" component={Task} />
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
