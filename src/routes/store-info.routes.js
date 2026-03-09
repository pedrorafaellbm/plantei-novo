import { Router } from 'express';
import storeInfoController from '../controllers/store-info.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const router = Router();

router.get('/', storeInfoController.get);
router.put('/', authMiddleware, adminMiddleware, storeInfoController.update);

export default router;
