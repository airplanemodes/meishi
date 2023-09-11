/* Node.js + Express.js + MongoDB
    Meishi server-side code */

const express = require('express');
const path = require('path');
const http = require('http');
const mongodb = require('./mongo/connect');

const {routes, allowAccessControl} = require('./routes/config');
const app = express();

// translates data into json
app.use(express.json());

// sets local folder
app.use(express.static(path.join(__dirname, 'public')));

// resolves CORS policy, must be done before routing
allowAccessControl(app);

// enables routing
routes(app);

// server launch
const server = http.createServer(app);
let port = process.env.PORT || "3500";
server.listen(port, () => console.log(`Listening on port ${port}...`));