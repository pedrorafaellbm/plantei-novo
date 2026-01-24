import { Categoria } from "../models/Categoria.js";

export default {
  async listar(req, res) {
    try {
      const categorias = await Categoria.findAll();
      return res.json(categorias);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao listar categorias" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (!categoria) {
        return res.status(404).json({ erro: "Categoria não encontrada" });
      }
      return res.json(categoria);
    } catch (err) {
      return res.status(500).json({ erro: "Erro no servidor" });
    }
  },

  async criar(req, res) {
    try {
      const categoria = await Categoria.create(req.body);
      return res.status(201).json(categoria);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao criar categoria" });
    }
  },

  async atualizar(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (!categoria) {
        return res.status(404).json({ erro: "Categoria não encontrada" });
      }
      await categoria.update(req.body);
      return res.json(categoria);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao atualizar categoria" });
    }
  },

  async remover(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (!categoria) {
        return res.status(404).json({ erro: "Categoria não encontrada" });
      }
      await categoria.destroy();
      return res.json({ mensagem: "Categoria removida com sucesso" });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao remover categoria" });
    }
  }
};
