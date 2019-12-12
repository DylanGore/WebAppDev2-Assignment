import express from 'express';
import path from 'path';
import './env';
import './db/db';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccount.json';
import projectRoutes from './routes/project.routes';
import taskRoutes from './routes/task.routes';
import clientRoutes from './routes/client.routes';

const env = process.env.NODE_ENV || 'dev';
console.info(`Environment: ${env}`);
// Initialise Firebase Admin
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DB_URL
    });
    console.info('Firebase: Authenticated with Firebase!');
} catch (err) {
    console.error(`Firebase: Auth Error: ${err}`);
}

// Setup Express
const app = express();
const port = process.env.PORT || 3002;
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'react/build')));

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Checks request token against Firebase
function checkAuth(req, res, next) {
    // Handle dev auth token
    if (req.headers.authtoken) {
        // prettier-ignore
        admin.auth().verifyIdToken(req.headers.authtoken).then(() => {
            next()
        }).catch((err) => {
            console.error(err.message)
            if (env === 'dev' || env === 'test') {
                console.log('Dev/test mode')
                if (req.headers.authtoken === 'dev') {
                    console.log('Found dev/test token');
                    next();
                }else{
                    res.status(403).send('Unauthorized');
                }
            }else{
                res.status(403).send('Unauthorized');
            }
            
        });
    } else {
        res.status(403).send('Unauthorized');
    }
}

// Routes
app.use('/api/projects', checkAuth, projectRoutes);
app.use('/api/tasks', checkAuth, taskRoutes);
app.use('/api/clients', checkAuth, clientRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/clients', clientRoutes);

// Root URL
app.get('/api', function(req, res) {
    res.status(200).send('Project Manager API');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'react/build/index.html'));
});

// Handle 404 errors
app.use('*', function(req, res) {
    return res.status(404).send(`Error 404 - Not Found`);
});

// Run Server
app.listen(port, function() {
    console.log('Express: Project Manager API listening on port ' + port);
});
