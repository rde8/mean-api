const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000
const api = require('./routes/api')
const app = express()

app.use(bodyParser.json());

app.use('/api', api);

app.listen(PORT, () => console.log('Server started on '+PORT));