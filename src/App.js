import React from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
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

export const AuthContext = React.createContext(null);

function App() {
    return (
        <div className="App">
            <BrowserRouter>
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
            </BrowserRouter>
        </div>
    );
}

export default App;
