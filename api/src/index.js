import express from 'express';
import './env';
import './db';

// Express
const app = express();
const port = process.env.PORT || 3001;

app.get('/', function(req, res) {
    res.send('Project Manager API');
});

app.listen(port, function() {
    console.log('Example app listening on port ' + port);
});
