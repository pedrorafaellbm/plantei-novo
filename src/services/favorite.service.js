import { z } from 'zod';
import { Favorite } from '../models/Favorite.js';
import { Produto } from '../models/produto.js';

const productIdSchema = z.coerce.number().int().positive();

class FavoriteService {
  async add(userId, productIdInput) {
    const productId = productIdSchema.parse(productIdInput);
    const product = await Produto.findByPk(productId);
    if (!product) return { status: 'not_found' };

    try {
      const favorite = await Favorite.create({ userId, productId });
      return { status: 'created', favorite };
    } catch (error) {
      if (error?.name === 'SequelizeUniqueConstraintError') {
        const favorite = await Favorite.findOne({ where: { userId, productId } });
        return { status: 'exists', favorite };
      }
      throw error;
    }
  }

  async remove(userId, productIdInput) {
    const productId = productIdSchema.parse(productIdInput);
    const favorite = await Favorite.findOne({ where: { userId, productId } });
    if (!favorite) return false;
    await favorite.destroy();
    return true;
  }

  async listByUser(userId) {
    return Favorite.findAll({
      where: { userId },
      include: [{ model: Produto, as: 'product', attributes: ['id', 'nome', 'descricao', 'preco', 'estoque', 'imageUrl', 'categoria', 'categoryId', 'featured'] }],
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new FavoriteService();
