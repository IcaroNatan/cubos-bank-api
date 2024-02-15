const pool = require("../config/conexao");

const existeCategoria = async (categoria_id, res) => {
  const categorias = await pool.query(
    "select * from categorias where id = $1",
    [categoria_id]
  );

  if (categorias.rowCount < 1) {
    return res.status(404).json({ mensagem: "Categoria não encontrada." });
  }
};

module.exports = existeCategoria;
