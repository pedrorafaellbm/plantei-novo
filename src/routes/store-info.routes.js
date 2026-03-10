import { Router } from 'express';
import storeInfoController from '../controllers/store-info.controller.js';
import storeInfoCardController from '../controllers/store-info-card.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const router = Router();

router.get('/', storeInfoController.get);
router.get('/cards', storeInfoCardController.publicList);
router.put('/', authMiddleware, adminMiddleware, storeInfoController.update);

export default router;
