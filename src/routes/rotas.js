const express = require("express");
const usuario = require("../controllers/usuarios");
const verificarLogin = require("../middlewares/autenticacao");
const { listarCategorias } = require("../controllers/categorias");

const rotas = express();

rotas.use(express.json());

rotas.post("/usuario", usuario.cadastrarUsuario);
rotas.post("/login", usuario.loginUsuario);

rotas.use(verificarLogin);
rotas.get("/usuario", usuario.detalharUsuario);
rotas.put("/usuario", usuario.atualizarUsuario);
rotas.get("/categorias", listarCategorias);

module.exports = rotas;
