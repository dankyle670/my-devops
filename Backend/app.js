const express = require('express');
const bodyParser = require('body-parser')
const db = require("./config/db");
const todoRoutes = require('./routes/todoRoutes');
const createTable = require('./Database/createTable');

const app = express();

app.use(express.json());
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

createTable();

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
  next()
});

app.use('/api', todoRoutes);


module.exports = app;