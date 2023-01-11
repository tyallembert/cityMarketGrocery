//good tutorial for setting up backend
//https://www.youtube.com/watch?v=3isCTSUdXaQ

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routesHandler = require('./routes/handler.js');

const app = express();
app.use(cors());
app.use('/',routesHandler);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const PORT = 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://localhost:${PORT} or http://0.0.0.0:${PORT}`);
});