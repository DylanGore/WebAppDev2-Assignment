import React from 'react';
import firebase from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import AppRouter from './routes/RouterApp';
import Loading from './layout/Loading';

function App() {
    // eslint-disable-next-line
    const [user, initialising, error] = useAuthState(firebase.auth());

    if (!initialising) {
        return (
            <div className="App">
                <AppRouter />
            </div>
        );
    } else {
        return (
            <h1>
                <Loading />
            </h1>
        );
    }
}

export default App;
