const express = require("express");
const { cadastrarUsuario, loginUsuario } = require("../controllers/usuarios");

const rotas = express();

rotas.use(express.json());

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", loginUsuario);

module.exports = rotas;
