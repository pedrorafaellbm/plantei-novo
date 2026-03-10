import { createCard, listCards, removeCard, updateCard } from '../services/store-info-card.service.js';
import { getStoreInfo } from '../services/store-info.service.js';

export default {
  async list(req, res, next) {
    try {
      const storeInfo = await getStoreInfo();
      const cards = await listCards(storeInfo.id);
      return res.status(200).json({ data: cards, size: cards.length });
    } catch (error) {
      return next(error);
    }
  },

  async create(req, res, next) {
    try {
      const storeInfo = await getStoreInfo();
      const card = await createCard(storeInfo.id, req.body);
      return res.status(201).json({ data: card });
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      const card = await updateCard(req.params.id, req.body);
      if (!card) return res.status(404).json({ error: 'Card nao encontrado' });
      return res.status(200).json({ data: card });
    } catch (error) {
      return next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const deleted = await removeCard(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Card nao encontrado' });
      return res.status(200).json({ message: 'Card removido com sucesso' });
    } catch (error) {
      return next(error);
    }
  },
};
