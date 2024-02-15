const validaTipo = (tipo, res) => {
  if (!tipo) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }
};

const validaDescricao = (descricao, res) => {
  if (!descricao) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }
};

const validaValor = (valor, res) => {
  if (!valor) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }
};

const validaData = (data, res) => {
  if (!data) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }
};

const validaCategoria = (categoria_id, res) => {
  if (!categoria_id) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }
};

module.exports = {
  validaTipo,
  validaDescricao,
  validaValor,
  validaData,
  validaCategoria,
};
