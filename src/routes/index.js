import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import produtoRoutes from './produto.routes.js';
import contatoRoutes from './contato.routes.js';
import adminRoutes from './admin.routes.js';
import favoritoRoutes from './favorito.routes.js';
import usuariosRoutes from './usuarios.routes.js';

const router = Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/products', produtoRoutes);
router.use('/produtos', produtoRoutes);
router.use('/contatos', contatoRoutes);
router.use('/contato', contatoRoutes);
router.use('/contact', contatoRoutes);
router.use('/admin', adminRoutes);
router.use('/favoritos', favoritoRoutes);
router.use('/usuarios', usuariosRoutes);

export default router;
