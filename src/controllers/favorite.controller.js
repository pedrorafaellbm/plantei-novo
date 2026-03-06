import favoriteService from '../services/favorite.service.js';
import { log } from '../utils/logger.js';

export default {
  async add(req, res, next) {
    try {
      const result = await favoriteService.add(req.user.id, req.params.productId);
      if (result.status === 'not_found') return res.status(404).json({ error: 'Product not found' });
      if (result.status === 'exists') return res.status(200).json({ message: 'Already favorited', data: result.favorite });
      return res.status(201).json({ message: 'Favorite added', data: result.favorite });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const removed = await favoriteService.remove(req.user.id, req.params.productId);
      if (!removed) return res.status(404).json({ error: 'Favorite not found' });
      return res.status(200).json({ message: 'Favorite removed' });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },

  async list(req, res, next) {
    try {
      const favorites = await favoriteService.listByUser(req.user.id);
      return res.status(200).json({ data: favorites, size: favorites.length });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },
};
