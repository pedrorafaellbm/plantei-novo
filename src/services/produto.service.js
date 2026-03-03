import { z } from 'zod';
import { Produto } from '../models/produto.js';

const createSchema = z.object({
  nome: z.string().trim().min(1, 'Nome e obrigatorio'),
  descricao: z.string().trim().optional().or(z.literal('')),
  preco: z.coerce.number().min(0, 'Preco invalido'),
  estoque: z.coerce.number().int().min(0, 'Estoque invalido'),
  imageUrl: z.string().trim().url('ImageUrl invalida').optional().or(z.literal('')),
});

const patchSchema = createSchema.partial();

class ProdutoService {
  async listar() {
    return Produto.findAll({ order: [['createdAt', 'DESC']] });
  }

  async buscarPorId(id) {
    return Produto.findByPk(id);
  }

  async criar(payload) {
    const parsed = createSchema.parse(payload);
    return Produto.create({
      nome: parsed.nome,
      descricao: parsed.descricao || null,
      preco: parsed.preco,
      estoque: parsed.estoque,
      imageUrl: parsed.imageUrl || null,
    });
  }

  async atualizar(id, payload, partial = false) {
    const produto = await Produto.findByPk(id);
    if (!produto) return null;

    const parsed = partial ? patchSchema.parse(payload) : createSchema.parse(payload);
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
