import React from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import history from './routes/history';
import firebase from './config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
// My Components
import NavbarApp from './components/layout/NavbarApp';
import Footer from './components/layout/Footer';
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Project from './components/projects/Project';
import AddProject from './components/projects/AddProject';
import NotFound from './components/error/NotFound';

function App() {
    // eslint-disable-next-line
    const [user, initialising, error] = useAuthState(firebase.auth());
    if (!initialising) {
        return (
            <div className="App">
                <Router history={history}>
                    <NavbarApp />
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/dashboard" />
                        </Route>
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/projects" component={Projects} />
                        <Route exact path="/projects/add" component={AddProject} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/projects/:id" component={Project} />
                        <Route exact path="/404" component={NotFound} />
                        <Route path="*">
                            <Redirect to="/404" />
                        </Route>
                    </Switch>

                    <Footer />
                </Router>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
}

export default App;
