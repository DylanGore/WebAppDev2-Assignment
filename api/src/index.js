import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log('Example app listening on port ' + port);
});
