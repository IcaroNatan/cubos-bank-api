const validaNome = (nome, res) => {
  if (!nome) {
    return res.status(400).json({ mensagem: "Preencha o campo nome." });
  }
};

const validaEmail = (email, res) => {
  if (!email) {
    return res.status(400).json({ mensagem: "Preencha o campo email." });
  }
};

const validaSenha = (senha, res) => {
  if (!senha) {
    return res.status(400).json({ mensagem: "Preencha o campo senha." });
  }
};

module.exports = {
  validaNome,
  validaEmail,
  validaSenha,
};
