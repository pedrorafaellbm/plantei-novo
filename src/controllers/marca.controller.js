import { Marca } from "../models/Marca.js";

export default {
  async listar(req, res) {
    try {
      const marcas = await Marca.findAll();
      return res.json(marcas);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao listar marcas" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const marca = await Marca.findByPk(req.params.id);
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
      const marca = await Marca.create(req.body);
      return res.status(201).json(marca);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao criar marca" });
    }
  },

  async atualizar(req, res) {
    try {
      const marca = await Marca.findByPk(req.params.id);
      if (!marca) {
        return res.status(404).json({ erro: "Marca não encontrada" });
      }
      await marca.update(req.body);
      return res.json(marca);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao atualizar marca" });
    }
  },

  async remover(req, res) {
    try {
      const marca = await Marca.findByPk(req.params.id);
      if (!marca) {
        return res.status(404).json({ erro: "Marca não encontrada" });
      }
      await marca.destroy();
      return res.json({ mensagem: "Marca removida com sucesso" });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao remover marca" });
    }
  }
};
