import { Router } from 'express';
import profileController from '../controllers/profile.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/profile', profileController.get);
router.put('/profile', profileController.update);

export default router;
