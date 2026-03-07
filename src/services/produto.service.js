import { z } from 'zod';
import { Produto } from '../models/produto.js';
import { Category } from '../models/Category.js';
import HttpError from '../utils/http-error.js';

const createSchema = z.object({
  nome: z.string().trim().min(1, 'Nome e obrigatorio'),
  descricao: z.string().trim().optional().or(z.literal('')),
  preco: z.coerce.number().min(0, 'Preco invalido'),
  estoque: z.coerce.number().int().min(0, 'Estoque invalido'),
  imageUrl: z.string().trim().url('ImageUrl invalida').optional().or(z.literal('')),
  categoria: z.string().trim().optional().or(z.literal('')),
  categoryId: z.coerce.number().int().positive().optional(),
  category_id: z.coerce.number().int().positive().optional(),
});

const patchSchema = createSchema.partial();

const resolveCategory = async (parsed) => {
  const candidateId = parsed.category_id ?? parsed.categoryId;
  const candidateName = parsed.categoria?.trim();

  if (candidateId) {
    const category = await Category.findByPk(candidateId);
    if (!category) throw new HttpError(400, 'Categoria inexistente');
    return { categoria: category.name, categoryId: category.id };
  }

  if (candidateName) {
    const category = await Category.findOne({ where: { name: candidateName } });
    if (!category) throw new HttpError(400, 'Categoria inexistente');
    return { categoria: category.name, categoryId: category.id };
  }

  const fallbackCategory = await Category.findOne({ order: [['id', 'ASC']] });
  if (fallbackCategory) {
    return { categoria: fallbackCategory.name, categoryId: fallbackCategory.id };
  }

  return { categoria: 'Plantas', categoryId: null };
};

class ProdutoService {
  async listar() {
    return Produto.findAll({ include: [{ model: Category, as: 'category', attributes: ['id', 'name'], required: false }], order: [['createdAt', 'DESC']] });
  }

  async buscarPorId(id) {
    return Produto.findByPk(id, { include: [{ model: Category, as: 'category', attributes: ['id', 'name'], required: false }] });
  }

  async criar(payload) {
    const parsed = createSchema.parse(payload);
    const categoryPayload = await resolveCategory(parsed);
    return Produto.create({
      nome: parsed.nome,
      descricao: parsed.descricao || null,
      preco: parsed.preco,
      estoque: parsed.estoque,
      imageUrl: parsed.imageUrl || null,
      ...categoryPayload,
    });
  }

  async atualizar(id, payload, partial = false) {
    const produto = await Produto.findByPk(id);
    if (!produto) return null;

    const parsed = partial ? patchSchema.parse(payload) : createSchema.parse(payload);
    let categoryPayload = {};
    if (
      parsed.category_id !== undefined ||
      parsed.categoryId !== undefined ||
      parsed.categoria !== undefined
    ) {
      categoryPayload = await resolveCategory(parsed);
    }
    await produto.update({
      ...(parsed.nome !== undefined ? { nome: parsed.nome } : {}),
      ...(parsed.descricao !== undefined
        ? { descricao: parsed.descricao === '' ? null : parsed.descricao }
        : {}),
      ...(parsed.preco !== undefined ? { preco: parsed.preco } : {}),
      ...(parsed.estoque !== undefined ? { estoque: parsed.estoque } : {}),
      ...(parsed.imageUrl !== undefined
        ? { imageUrl: parsed.imageUrl === '' ? null : parsed.imageUrl }
        : {}),
      ...categoryPayload,
    });

    return produto;
  }

  async remover(id) {
    const produto = await Produto.findByPk(id);
    if (!produto) return null;
    await produto.destroy();
    return true;
  }
}

export default new ProdutoService();
