const existeTipo = (tipo, res) => {
  if (!(tipo === "entrada" || tipo === "saida")) {
    return res.status(400).json({ mensagem: "Tipo inválido." });
  }
};

module.exports = existeTipo;
