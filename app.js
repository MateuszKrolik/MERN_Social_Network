const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express(); //create express app, by executing express function

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //allow access to any client
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  ); //allow these methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //allow these headers
  next();
});

app.use('/feed', feedRoutes);

mongoose
  .connect(
    'mongodb+srv://mateuszkrolik87:1I9UbNZqMksVzkNk@cluster0.gdjmk4f.mongodb.net/messages'
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
