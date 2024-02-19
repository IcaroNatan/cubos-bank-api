const pool = require("../config/conexao");
const existeCategoria = require("../middlewares/existeCategoria");
const existeTipo = require("../middlewares/existeTipo");
const {
  validaTipo,
  validaDescricao,
  validaCategoria,
  validaData,
  validaValor,
} = require("../middlewares/validacaoTransacoes");

const transacoesUsuarioLogado = async (req, res) => {
  const { id } = req.usuario;
  const { filtro } = req.query;
  try {
    if (filtro) {
      let resultado = [];
      for (let categoria of filtro) {
        const { rowCount, rows } = await pool.query(
          `
      select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuarios_id, t.categoria_id, c.descricao as categoria_nome 
      from transacoes t 
      join categorias c on t.categoria_id = c.id 
      where t.usuarios_id = $1 and c.descricao = $2
      `,
          [id, categoria]
        );

        if (rowCount > 0) {
          resultado.push(rows);
        }
      }
      return res.status(200).json(resultado);
    }
    if (!filtro) {
      const { rows, rowCount } = await pool.query(
        `
        select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuarios_id, t.categoria_id, c.descricao as categoria_nome 
        from transacoes t 
        join categorias c on t.categoria_id = c.id 
        where t.usuarios_id = $1
        `,
        [id]
      );

      return res.status(200).json(rows);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const obterExtratoTransacoes = async (req, res) => {
  const { id } = req.usuario;
  try {
    const entrada = await pool.query(
      "select sum(valor) as soma_entrada from transacoes where tipo = 'entrada' and usuarios_id = $1",
      [id]
    );

    let soma_entrada = entrada.rows[0].soma_entrada;

    if (entrada.rowCount < 1) {
      soma_entrada = 0;
    }

    const saida = await pool.query(
      "select sum(valor) as soma_saida from transacoes where tipo ='saida' and usuarios_id = $1",
      [id]
    );

    let soma_saida = saida.rows[0].soma_saida;

    if (saida.rowCount < 1) {
      soma_saida = 0;
    }

    return res.status(200).json({
      entrada: soma_entrada,
      saida: soma_saida,
    });
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
      `
      select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuarios_id, t.categoria_id, c.descricao as categoria_nome 
      from transacoes t 
      join categorias c on t.categoria_id = c.id 
      where t.usuarios_id = $1
      `,
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

  validaTipo(tipo, res);
  validaDescricao(descricao, res);
  validaValor(valor, res);
  validaData(data, res);
  validaCategoria(categoria_id, res);

  try {
    existeCategoria(categoria_id, res);
    existeTipo(tipo, res);

    const { rows } = await pool.query(
      "insert into transacoes (descricao, valor, data, categoria_id, usuarios_id, tipo) values ($1, $2, $3, $4, $5, $6) returning *",
      [descricao, valor, data, categoria_id, id, tipo]
    );

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const atualizarTransacaoUsuarioLogado = async (req, res) => {
  const { id } = req.params;
  const { tipo, descricao, valor, data, categoria_id } = req.body;

  if (!id) {
    return res.status(400).json({ mensagem: "Preencha o campo id." });
  }

  validaTipo(tipo, res);
  validaDescricao(descricao, res);
  validaValor(valor, res);
  validaData(data, res);
  validaCategoria(categoria_id, res);

  try {
    const transacao = await pool.query(
      "select * from transacoes where id = $1",
      [id]
    );
    if (transacao.rowCount < 1) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }
    if (transacao.rows[0].usuarios_id !== req.usuario.id) {
      return res.status(401).json({ mensagem: "Não autorizado." });
    }
    existeCategoria(categoria_id, res);
    existeTipo(tipo, res);

    const query = await pool.query(
      "update transacoes set tipo = $1, descricao = $2, valor = $3, data = $4, categoria_id = $5 where id = $6",
      [tipo, descricao, valor, data, categoria_id, id]
    );

    return res.status(204).json();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluirTransacaoUsuarioLogado = async (req, res) => {
  const { id } = req.params;
  try {
    const transacao = await pool.query(
      "select * from transacoes where id = $1",
      [id]
    );
    if (transacao.rowCount < 1) {
      return res.status(404).json({ mensagem: "Transação não encontrada." });
    }
    if (transacao.rows[0].usuarios_id !== req.usuario.id) {
      return res.status(401).json({ mensagem: "Não autorizado." });
    }

    const query = await pool.query("delete from transacoes where id = $1", [
      id,
    ]);

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  transacoesUsuarioLogado,
  detalharTransacaoUsuarioLogado,
  cadastrarTransacaoUsuarioLogado,
  atualizarTransacaoUsuarioLogado,
  excluirTransacaoUsuarioLogado,
  obterExtratoTransacoes,
};
