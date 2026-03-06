import { Router } from 'express';
import favoriteController from '../controllers/favorite.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.post('/:productId', favoriteController.add);
router.delete('/:productId', favoriteController.remove);
router.get('/', favoriteController.list);

export default router;
