import { Router } from 'express';
import bannerController from '../controllers/banner.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', bannerController.list);
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), bannerController.create);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), bannerController.update);
router.delete('/:id', authMiddleware, adminMiddleware, bannerController.remove);

export default router;
