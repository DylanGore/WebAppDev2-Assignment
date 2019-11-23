import express from 'express';
import './env';
import './db/db';
import cors from 'cors';
import bodyParser from 'body-parser';
import projectRoutes from './routes/project.routes';
import taskRoutes from './routes/task.routes';
import clientRoutes from './routes/client.routes';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/clients', clientRoutes);

app.get('/', function(req, res) {
    res.status(200).send('Project Manager API');
});

app.listen(port, function() {
    console.log('Project Manager API listening on port ' + port);
});
