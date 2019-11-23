import express from 'express';
import './env';
import './db/db';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import projectRoutes from './routes/project.routes';
import taskRoutes from './routes/task.routes';
import clientRoutes from './routes/client.routes';

// Setup Express
const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/clients', clientRoutes);

// Root URL
app.get('/', function(req, res) {
    res.status(200).send('Project Manager API');
});

// Handle 404 errors
app.use('*', function(req, res, next) {
    return res.status(404).send(`Error 404 - Not Found`);
});

// Run Server
app.listen(port, function() {
    console.log('Project Manager API listening on port ' + port);
});
