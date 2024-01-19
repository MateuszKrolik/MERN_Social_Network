const express = require('express'); //import express

const feedRoutes = require('./routes/feed');

const app = express(); //create express app, by executing express function

app.use('/feed', feedRoutes); 

app.listen(8080); //will need 3000 later
