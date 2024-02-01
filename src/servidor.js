const express = require("express");
const rotas = require("./routes/rotas");

const app = express();

app.use(express.json());

app.use(rotas);

module.exports = app;
