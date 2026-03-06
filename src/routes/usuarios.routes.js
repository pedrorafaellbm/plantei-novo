import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = Router();

router.delete('/:id', verifyToken, verifyAdmin, adminController.removerUsuario);

export default router;
