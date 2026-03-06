import { z } from 'zod';
import { Category } from '../models/Category.js';

const categorySchema = z.object({
  name: z.string().trim().min(1),
});

export const listCategories = async () => Category.findAll({ order: [['name', 'ASC']] });

export const createCategory = async (payload) => {
  const parsed = categorySchema.parse(payload);
  return Category.create({ name: parsed.name });
};

export const updateCategory = async (id, payload) => {
  const parsed = categorySchema.partial().parse(payload);
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.update(parsed);
  return category;
};

export const removeCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) return false;
  await category.destroy();
  return true;
};
