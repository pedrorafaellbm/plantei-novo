import { createCategory, listCategories, removeCategory, updateCategory } from '../services/category.service.js';

export default {
  async list(req, res) {
    const data = await listCategories();
    return res.status(200).json({ data, size: data.length });
  },

  async create(req, res) {
    const data = await createCategory(req.body);
    return res.status(201).json({ data });
  },

  async update(req, res) {
    const data = await updateCategory(req.params.id, req.body);
    if (!data) return res.status(404).json({ error: 'Category not found' });
    return res.status(200).json({ data });
  },

  async remove(req, res) {
    const removed = await removeCategory(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Category not found' });
    return res.status(200).json({ message: 'Category removed' });
  },
};
