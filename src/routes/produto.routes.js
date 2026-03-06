import { Router } from 'express';
import produtoController from '../controllers/produto.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = Router();

router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscarPorId);
router.post('/', verifyToken, verifyAdmin, produtoController.criar);
router.put('/:id', verifyToken, verifyAdmin, produtoController.atualizar);
router.delete('/:id', verifyToken, verifyAdmin, produtoController.remover);

export default router;
