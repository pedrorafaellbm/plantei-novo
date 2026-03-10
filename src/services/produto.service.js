import { Op } from 'sequelize';
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
  featured: z
    .union([z.boolean(), z.string().trim()])
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;
      if (typeof value === 'boolean') return value;
      const normalized = value.toLowerCase();
      return ['true', '1', 'sim', 'yes', 'on'].includes(normalized);
    }),
  careLevel: z.string().trim().optional().or(z.literal('')),
});

const patchSchema = createSchema.partial();

const normalizeProductPayload = (payload = {}) => {
  const normalized = { ...payload };

  if (normalized.care_level && normalized.careLevel === undefined) {
    normalized.careLevel = normalized.care_level;
  }
  if (normalized.nivel_de_cuidado && normalized.careLevel === undefined) {
    normalized.careLevel = normalized.nivel_de_cuidado;
  }
  if (normalized.cuidado && normalized.careLevel === undefined) {
    normalized.careLevel = normalized.cuidado;
  }

  if (normalized.destaque !== undefined && normalized.featured === undefined) {
    normalized.featured = normalized.destaque;
  }
  if (normalized.em_destaque !== undefined && normalized.featured === undefined) {
    normalized.featured = normalized.em_destaque;
  }

  return normalized;
};

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
  async listar(filters = {}) {
    const where = {};

    if (filters.search?.trim()) {
      where.nome = {
        [Op.iLike]: `%${filters.search.trim()}%`,
      };
    }

    if (filters.featured === true) {
      where.featured = true;
    }

    return Produto.findAll({
      where,
      include: [{ model: Category, as: 'category', attributes: ['id', 'name'], required: false }],
      order: [['createdAt', 'DESC']],
      limit: filters.limit,
    });
  }

  async buscarPorId(id) {
    return Produto.findByPk(id, { include: [{ model: Category, as: 'category', attributes: ['id', 'name'], required: false }] });
  }

  async criar(payload) {
    const parsed = createSchema.parse(normalizeProductPayload(payload));
    const categoryPayload = await resolveCategory(parsed);
    return Produto.create({
      nome: parsed.nome,
      descricao: parsed.descricao || null,
      preco: parsed.preco,
      estoque: parsed.estoque,
      imageUrl: parsed.imageUrl || null,
      featured: parsed.featured ?? false,
      careLevel: parsed.careLevel || 'Facil',
      ...categoryPayload,
    });
  }

  async atualizar(id, payload, partial = false) {
    const produto = await Produto.findByPk(id);
    if (!produto) return null;

    const normalized = normalizeProductPayload(payload);
    const parsed = partial ? patchSchema.parse(normalized) : createSchema.parse(normalized);
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
      ...(parsed.featured !== undefined ? { featured: parsed.featured } : {}),
      ...(parsed.careLevel !== undefined ? { careLevel: parsed.careLevel || 'Facil' } : {}),
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
