/* Node.js + Express.js + MongoDB
    Server-side code */

const express = require('express');
const path = require('path');
const http = require('http');
const mongodb = require('./mongo/connect');

const {routes, allowAccessControl} = require('./routes/config');
const app = express();

app.use(express.json()); // translates data into json
app.use(express.static(path.join(__dirname, 'public'))); // sets local folder
allowAccessControl(app); // resolve block by CORS policy, should to be before routing
routes(app); // enables routing



// server launch
const server = http.createServer(app);
let port = process.env.PORT || "3500";
server.listen(port, () => console.log(`Listening on port ${port}...`));