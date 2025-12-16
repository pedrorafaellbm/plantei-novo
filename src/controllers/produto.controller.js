import { Produto } from "../models/produto.js";

export default {
  async listar(req, res) {
    try {
      const produtos = await Produto.findAll();

      return res.status(200).json({
        mensagem: "Produtos retornados com sucesso!",
        size: produtos.length,
        data: produtos,
      });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao buscar produtos" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(id);

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
      const payload = req.body;

      const novo = await Produto.create(payload);


      return res.status(201).json({
        mensagem: "Produto criado com sucesso!",
        data: novo,
      });
    } catch (err) {

      if (err.name === "SequelizeValidationError") {
        return res.status(400).json({
          erro: err.errors.map((e) => e.message),
        });
      }

      return res.status(500).json({ erro: "Erro ao criar produto" });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }

      await produto.update(payload);

      return res.json({
        mensagem: "Produto atualizado com sucesso!",
        data: produto,
      });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao atualizar produto" });
    }
  },

  async patch(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }

      await produto.update(payload);

      return res.json({
        mensagem: "Produto atualizado parcialmente!",
        data: produto,
      });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao atualizar parcialmente" });
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }

      await produto.destroy();

      return res.json({ mensagem: "Produto removido com sucesso!" });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao remover produto" });
    }
  },
};