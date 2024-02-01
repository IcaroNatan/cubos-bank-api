const express = require("express");

const rotas = express();

rotas.use(express.json());

module.exports = rotas;
