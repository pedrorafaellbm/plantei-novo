import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import adminProductController from '../controllers/admin-product.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.use(authMiddleware, roleMiddleware('admin'));

router.get('/users', adminController.listarUsuarios);
router.patch('/users/:id/role', adminController.atualizarRole);
router.post('/products', upload.single('image'), adminProductController.create);
router.patch('/products/:id', upload.single('image'), adminProductController.update);
router.delete('/products/:id', adminProductController.remove);

export default router;
