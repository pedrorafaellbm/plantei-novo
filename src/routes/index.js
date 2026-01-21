import { Router } from 'express';
import produtoRoutes from './produto.routes.js';
import contatoRoutes from './contato.routes.js';
import healthRoutes from './health.routes.js'; 
 import authRoutes from './auth.routes.js';

const router = Router();

router.use('/', healthRoutes);
router.use('/produtos', produtoRoutes);
router.use('/contatos', contatoRoutes);
router.use('/auth', authRoutes); // Rotas de autenticação

export default router;