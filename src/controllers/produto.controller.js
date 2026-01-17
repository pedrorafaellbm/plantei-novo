import { Produto } from "../models/Produto.js";

export default {
  async listar(req, res) {
    try {
      const produtos = await Produto.findAll();
      console.log("Listando produtos...");
      return res.status(200).json({
        mensagem: "Produtos retornados com sucesso!",
        size: produtos.length,
        data: produtos,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao buscar produtos" });
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
      console.error(err);
      return res.status(500).json({ erro: "Erro no servidor" });
    }
  },

  async criar(req, res) {
    try {
      const novo = await Produto.create(req.body);
      console.log(`Produto criado: ${novo.nome}`);
      return res.status(201).json({
        mensagem: "Produto criado com sucesso!",
        data: novo,
      });
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
      console.error(err);
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
      return res.json({ mensagem: "Produto removido com sucesso!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao remover produto" });
    }
  },
};
