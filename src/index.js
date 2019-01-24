require('dotenv').config({ path: 'variables.env' });

var server_port = process.env.PORT || 8080;

const express = require('express');
const bodyParser = require('body-parser');

const verifyWebhook = require('./verify-webhook');
const messageWebhook = require('./message-webhook');
const database = require('./sql');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', verifyWebhook);
app.get('/', database);
app.post('/', messageWebhook);

app.listen(server_port, function() {
    console.log("Application running on http://localhost:"+server_port);
});

