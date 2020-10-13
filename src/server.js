//imports
const express = require('express');
const PORT = 3001;
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const Router = require('./routes/Router');

//configs
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(Router);

//start point
server.listen(PORT, () => console.log(`API IS RUNNING ON PORT ${PORT}`));
