import produtoService from '../services/produto.service.js';
import { log } from '../utils/logger.js';

export default {
  async listar(req, res, next) {
    try {
      const produtos = await produtoService.listar();
      return res.status(200).json({ data: produtos, size: produtos.length });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const produto = await produtoService.buscarPorId(req.params.id);
      if (!produto) return res.status(404).json({ error: 'Produto nao encontrado' });
      return res.status(200).json(produto);
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },

  async criar(req, res, next) {
    try {
      const novo = await produtoService.criar(req.body);
      return res.status(201).json({ data: novo });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },

  async atualizar(req, res, next) {
    try {
      const produto = await produtoService.atualizar(req.params.id, req.body, false);
      if (!produto) return res.status(404).json({ error: 'Produto nao encontrado' });
      return res.status(200).json({ data: produto });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },

  async patch(req, res, next) {
    try {
      const produto = await produtoService.atualizar(req.params.id, req.body, true);
      if (!produto) return res.status(404).json({ error: 'Produto nao encontrado' });
      return res.status(200).json({ data: produto });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },

  async remover(req, res, next) {
    try {
      const removido = await produtoService.remover(req.params.id);
      if (!removido) return res.status(404).json({ error: 'Produto nao encontrado' });
      return res.status(200).json({ message: 'Produto removido com sucesso' });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },
};
