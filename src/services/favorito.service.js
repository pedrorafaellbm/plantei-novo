import { z } from 'zod';
import { Favorito } from '../models/Favorito.js';
import { Produto } from '../models/produto.js';

const produtoIdSchema = z.coerce.number().int().positive();

class FavoritoService {
  async adicionar(usuarioId, produtoIdParam) {
    const produtoId = produtoIdSchema.parse(produtoIdParam);
    const produto = await Produto.findByPk(produtoId);
    if (!produto) return { status: 'not_found' };

    try {
      const favorito = await Favorito.create({ usuarioId, produtoId });
      return { status: 'created', favorito };
    } catch (error) {
      if (error?.name === 'SequelizeUniqueConstraintError') {
        const favorito = await Favorito.findOne({ where: { usuarioId, produtoId } });
        return { status: 'exists', favorito };
      }
      throw error;
    }
  }

  async remover(usuarioId, produtoIdParam) {
    const produtoId = produtoIdSchema.parse(produtoIdParam);
    const favorito = await Favorito.findOne({ where: { usuarioId, produtoId } });
    if (!favorito) return false;
    await favorito.destroy();
    return true;
  }

  async listarDoUsuario(usuarioId) {
    return Favorito.findAll({
      where: { usuarioId },
      include: [
        {
          model: Produto,
          as: 'produto',
          attributes: ['id', 'nome', 'descricao', 'preco', 'estoque', 'imageUrl'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new FavoritoService();
