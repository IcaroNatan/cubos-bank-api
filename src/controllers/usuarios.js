const pool = require("../config/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../config/senhaJwt");

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
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(400).json({ mensagem: "Preencha o campo email." });
  }
  if (!senha) {
    return res.status(400).json({ mensagem: "Preencha o campo senha." });
  }

  try {
    const { rows, rowCount } = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (rowCount < 1) {
      return res.status(400).json({
        mensagem: "Email ou senha inválido.",
      });
    }
    const senhaValida = await bcrypt.compare(senha, rows[0].senha);

    if (!senhaValida) {
      return res.status(400).json({
        mensagem: "Email ou senha inválido.",
      });
    }

    const token = jwt.sign({ id: rows[0].id }, senhaJwt, { expiresIn: "8h" });

    const usuarioLogado = {
      usuario: {
        id: rows[0].id,
        nome: rows[0].nome,
        email: rows[0].email,
      },
      token,
    };

    return res.status(200).json(usuarioLogado);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const detalharUsuario = async (req, res) => {
  const { senha: _, ...usuarioLogado } = req.usuario;

  try {
    return res.status(200).json(usuarioLogado);
  } catch (error) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

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
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioAtualizado = await pool.query(
      "update usuarios set nome = $1, email = $2, senha = $3",
      [nome, email, senhaCriptografada]
    );

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  detalharUsuario,
  atualizarUsuario,
};
