import { z } from 'zod';
import { Usuario } from '../models/Usuario.js';
import HttpError from '../utils/http-error.js';

const updateProfileSchema = z.object({
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().email().optional(),
  avatar_url: z.string().trim().url().optional().or(z.literal('')),
});

export const getProfile = async (userId) => {
  const user = await Usuario.findByPk(userId);
  if (!user) throw new HttpError(404, 'User not found');
  return user;
};

export const updateProfile = async (userId, payload) => {
  const parsed = updateProfileSchema.parse(payload);
  const user = await Usuario.findByPk(userId);
  if (!user) throw new HttpError(404, 'User not found');

  if (parsed.email && parsed.email.toLowerCase() !== user.email.toLowerCase()) {
    const existing = await Usuario.findOne({ where: { email: parsed.email.toLowerCase() } });
    if (existing && existing.id !== user.id) {
      throw new HttpError(409, 'Email already in use');
    }
  }

  await user.update({
    ...(parsed.name !== undefined ? { nome: parsed.name } : {}),
    ...(parsed.email !== undefined ? { email: parsed.email.toLowerCase() } : {}),
    ...(parsed.avatar_url !== undefined ? { avatarUrl: parsed.avatar_url || null } : {}),
  });

  return user;
};
