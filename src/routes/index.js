import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import produtoRoutes from './produto.routes.js';
import contatoRoutes from './contato.routes.js';
import adminRoutes from './admin.routes.js';
import favoritoRoutes from './favorito.routes.js';
import usuariosRoutes from './usuarios.routes.js';
import favoriteRoutes from './favorite.routes.js';
import userRoutes from './user.routes.js';
import addressRoutes from './address.routes.js';
import categoryRoutes from './category.routes.js';
import bannerRoutes from './banner.routes.js';
import contactRoutes from './contact.routes.js';
import storeInfoRoutes from './store-info.routes.js';

const router = Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/products', produtoRoutes);
router.use('/produtos', produtoRoutes);
router.use('/contatos', contatoRoutes);
router.use('/contato', contatoRoutes);
router.use('/admin', adminRoutes);
router.use('/favoritos', favoritoRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/user', userRoutes);
router.use('/address', addressRoutes);
router.use('/categories', categoryRoutes);
router.use('/banners', bannerRoutes);
router.use('/contact', contactRoutes);
router.use('/store-info', storeInfoRoutes);

export default router;
