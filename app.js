const express = require('express'); //import express
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express(); //create express app, by executing express function

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json


app.use('/feed', feedRoutes);

app.listen(8080); //will need 3000 later
