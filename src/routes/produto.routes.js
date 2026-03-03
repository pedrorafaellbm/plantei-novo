import { Router } from 'express';
import produtoController from '../controllers/produto.controller.js';

const router = Router();

router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscarPorId);

export default router;
