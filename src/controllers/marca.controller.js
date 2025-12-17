import { Marca } from "../models/Marca.js";

export default {
  async listar(req, res) {
    try {
      const marcas = await Marca.findAll();

      return res.status(200).json({
        mensagem: "Marcas retornadas com sucesso!",
        size: marcas.length,
        data: marcas,
      });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao buscar marcas" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const marca = await Marca.findByPk(id);

      if (!marca) {
        return res.status(404).json({ erro: "Marca não encontrada" });
      }

      return res.json(marca);
    } catch (err) {
      return res.status(500).json({ erro: "Erro no servidor" });
    }
  },

  async criar(req, res) {
    try {
      const payload = req.body;

      const novo = await Marca.create(payload);

      return res.status(201).json({
        mensagem: "Marca criada com sucesso!",
        data: novo,
      });
    } catch (err) {

      if (err.name === "SequelizeValidationError") {
        return res.status(400).json({
          erro: err.errors.map((e) => e.message),
        });
      }

      return res.status(500).json({ erro: "Erro ao criar marca" });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;

      const marca = await Marca.findByPk(id);

      if (!marca) {
        return res.status(404).json({ erro: "Marca não encontrada" });
      }

      await marca.update(payload);

      return res.json({
        mensagem: "Marca atualizada com sucesso!",
        data: marca,
      });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao atualizar marca" });
    }
  },

  async patch(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;

      const marca = await Marca.findByPk(id);

      if (!marca) {
        return res.status(404).json({ erro: "Marca não encontrada" });
      }

      await marca.update(payload);

      return res.json({
        mensagem: "Marca atualizada parcialmente!",
        data: marca,
      });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao atualizar parcialmente" });
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;

      const marca = await Marca.findByPk(id);

      if (!marca) {
        return res.status(404).json({ erro: "Marca não encontrada" });
      }

      await marca.destroy();

      return res.json({ mensagem: "Marca removida com sucesso!" });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao remover marca" });
    }
  },
};