/* Node.js + Express.js + MongoDB

    Modules used:
Express, Mongoose, Joi, Bcrypt, Lodash, jsonwebtoken */


const express = require('express');
const path = require('path');
const http = require('http');
const mongodb = require('./mongo/connect');

const {routes, allowAccessControl} = require('./routes/config');
const app = express();

app.use(express.json()); // translates data into json
app.use(express.static(path.join(__dirname, 'public'))); // sets local folder
routes(app); // enables routing
allowAccessControl(app);


/* Server */
const server = http.createServer(app);
let port = process.env.PORT || "3500";
server.listen(port, () => console.log(`Listening on port ${port}...`));