import React, { Fragment } from 'react';
import firebase from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import AppRouter from './routes/RouterApp';
import Loading from './layout/Loading';
import PageTitle from './misc/PageTitle';

// Main app component
function App() {
    // eslint-disable-next-line
    const [user, initialising, error] = useAuthState(firebase.auth());

    // If Firebase auth is still initializing, display loading symbol unitl it's done
    if (!initialising) {
        return (
            <div className="App">
                <PageTitle />
                <AppRouter />
            </div>
        );
    } else {
        return (
            <Fragment>
                <PageTitle />
                <Loading />
            </Fragment>
        );
    }
}

export default App;
