import { StoreInfoCard } from '../models/StoreInfoCard.js';

export const listCards = async (storeInfoId) =>
  StoreInfoCard.findAll({ where: { storeInfoId }, order: [['position', 'ASC'], ['createdAt', 'ASC']] });

export const createCard = async (storeInfoId, payload) =>
  StoreInfoCard.create({
    storeInfoId,
    title: payload.title.trim(),
    body: payload.body.trim(),
    position: payload.position ?? 0,
  });

export const updateCard = async (id, payload) => {
  const card = await StoreInfoCard.findByPk(id);
  if (!card) return null;

  await card.update({
    ...(payload.title !== undefined ? { title: payload.title.trim() } : {}),
    ...(payload.body !== undefined ? { body: payload.body.trim() } : {}),
    ...(payload.position !== undefined ? { position: payload.position } : {}),
  });

  return card;
};

export const removeCard = async (id) => {
  const card = await StoreInfoCard.findByPk(id);
  if (!card) return false;
  await card.destroy();
  return true;
};
