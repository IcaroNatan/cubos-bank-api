const express = require("express");
const { cadastrarUsuario } = require("../controllers/usuarios");

const rotas = express();

rotas.use(express.json());

rotas.post("/usuario", cadastrarUsuario);

module.exports = rotas;
