const express = require('express');
const db = require("./config/db");
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const createTable = require('./Database/createTable')

const app = express();

app.use(express.json());
app.use(cors());


createTable();



app.use('/api', todoRoutes);


app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});



module.exports = app;