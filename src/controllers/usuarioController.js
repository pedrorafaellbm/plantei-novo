const { Usuario } = require("../models");

module.exports = {
  // POST /usuario
  async criar(req, res) {
    try {
      const usuario = await Usuario.create(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  // PUT /usuario/:id
  async atualizar(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      await usuario.update(req.body);
      return res.json(usuario);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  // GET /usuario/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }
};
