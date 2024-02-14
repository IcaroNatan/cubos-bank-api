const pool = require("../config/conexao");

const transacoesUsuarioLogado = async (req, res) => {
  const { id } = req.usuario;

  try {
    const { rows, rowCount } = await pool.query(
      "select * from transacoes where usuarios_id = $1",
      [id]
    );

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const detalharTransacaoUsuarioLogado = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ mensagem: "Preencha o campo id." });
  }

  try {
    const { rows, rowCount } = await pool.query(
      "select * from transacoes where id = $1",
      [id]
    );

    if (rowCount < 1) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const cadastrarTransacaoUsuarioLogado = async (req, res) => {
  const { tipo, descricao, valor, data, categoria_id } = req.body;
  const { id } = req.usuario;

  if (!tipo) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }
  if (!descricao) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }
  if (!valor) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }
  if (!data) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }
  if (!categoria_id) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const categorias = await pool.query(
      "select * from categorias where id = $1",
      [categoria_id]
    );

    if (categorias.rowCount < 1) {
      return res.status(404).json({ mensagem: "Categoria não encontrada." });
    }

    if (tipo !== "entrada" || tipo !== "saida") {
      return res.status(400).json({ mensagem: "Tipo inválido." });
    }

    const { rows } = await pool.query(
      "insert into transacoes (descricao, valor, data, categoria_id, usuarios_id, tipo) values ($1, $2, $3, $4, $5, $6) returning *",
      [descricao, valor, data, categoria_id, id, tipo]
    );

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  transacoesUsuarioLogado,
  detalharTransacaoUsuarioLogado,
  cadastrarTransacaoUsuarioLogado,
};
