import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavbarApp from './components/layout/NavbarApp';
import Footer from './components/layout/Footer';
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import NotFound from './components/error/NotFound';
import Project from './components/projects/Project';
function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <NavbarApp />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/dashboard" />
                    </Route>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/projects" component={Projects} />
                    <Route exact path="/projects/:id" component={Project} />
                    <Route exact path="/404" component={NotFound} />
                    <Route path="*">
                        <Redirect to="/404" />
                    </Route>
                </Switch>
                <Footer />
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;
