import { z } from 'zod';
import { Category } from '../models/Category.js';

const categorySchema = z.object({
  name: z.string().trim().min(1).optional(),
  nome: z.string().trim().min(1).optional(),
  description: z.string().trim().optional().or(z.literal('')),
  descricao: z.string().trim().optional().or(z.literal('')),
});

export const listCategories = async () => Category.findAll({ order: [['name', 'ASC']] });

export const createCategory = async (payload) => {
  const parsed = categorySchema.parse(payload);
  const name = parsed.name || parsed.nome;
  const description = parsed.description ?? parsed.descricao ?? '';
  return Category.create({ name, description: description || null });
};

export const updateCategory = async (id, payload) => {
  const parsed = categorySchema.partial().parse(payload);
  const category = await Category.findByPk(id);
  if (!category) return null;
  const nextPayload = {};
  if (parsed.name !== undefined || parsed.nome !== undefined) {
    nextPayload.name = parsed.name || parsed.nome;
  }
  if (parsed.description !== undefined || parsed.descricao !== undefined) {
    nextPayload.description = parsed.description ?? parsed.descricao ?? null;
  }
  await category.update(nextPayload);
  return category;
};

export const removeCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) return false;
  await category.destroy();
  return true;
};
