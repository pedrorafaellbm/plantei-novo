import { Produto } from "../models/Produto.js";

export default {
  async listar(req, res) {
    try {
      const produtos = await Produto.findAll();
      return res.json(produtos);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao listar produtos" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const produto = await Produto.findByPk(req.params.id);
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }
      return res.json(produto);
    } catch (err) {
      return res.status(500).json({ erro: "Erro no servidor" });
    }
  },

  async criar(req, res) {
    try {
      const produto = await Produto.create(req.body);
      return res.status(201).json(produto);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao criar produto" });
    }
  },

  async atualizar(req, res) {
    try {
      const produto = await Produto.findByPk(req.params.id);
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }
      await produto.update(req.body);
      return res.json(produto);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao atualizar produto" });
    }
  },

  async remover(req, res) {
    try {
      const produto = await Produto.findByPk(req.params.id);
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }
      await produto.destroy();
      return res.json({ mensagem: "Produto removido com sucesso" });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao remover produto" });
    }
  }
};
