import { z } from 'zod';
import { Produto } from '../models/produto.js';
import { Category } from '../models/Category.js';
import HttpError from '../utils/http-error.js';

const categoriasPermitidas = ['Plantas', 'Vasos', 'Sementes', 'Fertilizantes'];

const createSchema = z.object({
  nome: z.string().trim().min(1, 'Nome e obrigatorio'),
  descricao: z.string().trim().optional().or(z.literal('')),
  preco: z.coerce.number().min(0, 'Preco invalido'),
  estoque: z.coerce.number().int().min(0, 'Estoque invalido'),
  imageUrl: z.string().trim().url('ImageUrl invalida').optional().or(z.literal('')),
  categoria: z
    .string()
    .trim()
    .transform((value) => (value ? value : 'Plantas'))
    .refine((value) => categoriasPermitidas.includes(value), 'Categoria invalida')
    .optional(),
  category_id: z.coerce.number().int().positive().optional(),
});

const patchSchema = createSchema.partial();

class ProdutoService {
  async listar() {
    return Produto.findAll({ include: [{ model: Category, as: 'category', attributes: ['id', 'name'], required: false }], order: [['createdAt', 'DESC']] });
  }

  async buscarPorId(id) {
    return Produto.findByPk(id, { include: [{ model: Category, as: 'category', attributes: ['id', 'name'], required: false }] });
  }

  async criar(payload) {
    const parsed = createSchema.parse(payload);
    let categoryId = parsed.category_id;
    let categoria = parsed.categoria || 'Plantas';
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) throw new HttpError(400, 'Categoria inexistente');
      categoria = category.name;
    }
    return Produto.create({
      nome: parsed.nome,
      descricao: parsed.descricao || null,
      preco: parsed.preco,
      estoque: parsed.estoque,
      imageUrl: parsed.imageUrl || null,
      categoria,
      categoryId: categoryId || null,
    });
  }

  async atualizar(id, payload, partial = false) {
    const produto = await Produto.findByPk(id);
    if (!produto) return null;

    const parsed = partial ? patchSchema.parse(payload) : createSchema.parse(payload);
    let categoryPayload = {};
    if (parsed.category_id !== undefined) {
      const category = await Category.findByPk(parsed.category_id);
      if (!category) throw new HttpError(400, 'Categoria inexistente');
      categoryPayload = { categoryId: category.id, categoria: category.name };
    } else if (parsed.categoria !== undefined) {
      categoryPayload = { categoria: parsed.categoria || 'Plantas' };
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
