const pool = require("../config/conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome) {
    return res.status(400).json({ mensagem: "Preencha o campo nome." });
  }
  if (!email) {
    return res.status(400).json({ mensagem: "Preencha o campo email." });
  }
  if (!senha) {
    return res.status(400).json({ mensagem: "Preencha o campo senha." });
  }

  try {
    const { rowCount } = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (rowCount === 1) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const { rows } = await pool.query(
      "insert into usuarios (nome, email, senha) values ($1, $2,$3) returning id, nome, email",
      [nome, email, senhaCriptografada]
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarUsuario,
};
