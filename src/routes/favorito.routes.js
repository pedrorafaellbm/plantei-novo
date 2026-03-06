import { Router } from 'express';
import favoritoController from '../controllers/favorito.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.use(verifyToken);
router.post('/:produtoId', favoritoController.adicionar);
router.delete('/:produtoId', favoritoController.remover);
router.get('/', favoritoController.listar);

export default router;
