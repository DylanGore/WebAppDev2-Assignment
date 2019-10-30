import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavbarApp from './components/layout/NavbarApp';
import Footer from './components/layout/Footer';
function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <NavbarApp />
                <h1>Hello, world!</h1>
                <Footer />
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;
