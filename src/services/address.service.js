import { z } from 'zod';
import { Address } from '../models/Address.js';

const addressSchema = z.object({
  name: z.string().trim().min(1),
  cep: z.string().trim().min(1),
  state: z.string().trim().min(1),
  city: z.string().trim().min(1),
  district: z.string().trim().min(1),
  street: z.string().trim().min(1),
  number: z.string().trim().min(1),
  complement: z.string().trim().optional().or(z.literal('')),
});

export const listAddresses = async (userId) =>
  Address.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });

export const createAddress = async (userId, payload) => {
  const parsed = addressSchema.parse(payload);
  return Address.create({ userId, ...parsed, complement: parsed.complement || null });
};

export const updateAddress = async (userId, id, payload) => {
  const parsed = addressSchema.partial().parse(payload);
  const address = await Address.findOne({ where: { id, userId } });
  if (!address) return null;
  await address.update({ ...parsed, ...(parsed.complement === '' ? { complement: null } : {}) });
  return address;
};

export const removeAddress = async (userId, id) => {
  const address = await Address.findOne({ where: { id, userId } });
  if (!address) return false;
  await address.destroy();
  return true;
};
