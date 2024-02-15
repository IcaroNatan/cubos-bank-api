const express = require("express");
const usuario = require("../controllers/usuarios");
const verificarLogin = require("../middlewares/autenticacao");
const { listarCategorias } = require("../controllers/categorias");
const transacoes = require("../controllers/transacoes");

const rotas = express();

rotas.use(express.json());

rotas.post("/usuario", usuario.cadastrarUsuario);
rotas.post("/login", usuario.loginUsuario);

rotas.use(verificarLogin);

rotas.get("/usuario", usuario.detalharUsuario);
rotas.put("/usuario", usuario.atualizarUsuario);

rotas.get("/categorias", listarCategorias);

rotas.get("/transacao", transacoes.transacoesUsuarioLogado);
rotas.get("/transacao/extrato", transacoes.obterExtratoTransacoes);
rotas.get("/transacao/:id", transacoes.detalharTransacaoUsuarioLogado);
rotas.post("/transacao", transacoes.cadastrarTransacaoUsuarioLogado);
rotas.put("/transacao/:id", transacoes.atualizarTransacaoUsuarioLogado);
rotas.delete("/transacao/:id", transacoes.excluirTransacaoUsuarioLogado);

module.exports = rotas;
