import favoritoService from '../services/favorito.service.js';
import { log } from '../utils/logger.js';

export default {
  async adicionar(req, res, next) {
    try {
      const result = await favoritoService.adicionar(req.user.id, req.params.produtoId);
      if (result.status === 'not_found') {
        return res.status(404).json({ error: 'Produto nao encontrado' });
      }
      if (result.status === 'exists') {
        return res.status(200).json({ message: 'Produto ja favoritado', data: result.favorito });
      }
      return res.status(201).json({ message: 'Favorito adicionado', data: result.favorito });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },

  async remover(req, res, next) {
    try {
      const removed = await favoritoService.remover(req.user.id, req.params.produtoId);
      if (!removed) return res.status(404).json({ error: 'Favorito nao encontrado' });
      return res.status(200).json({ message: 'Favorito removido' });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },

  async listar(req, res, next) {
    try {
      const favoritos = await favoritoService.listarDoUsuario(req.user.id);
      return res.status(200).json({ data: favoritos, size: favoritos.length });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },
};
