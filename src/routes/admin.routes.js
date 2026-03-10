import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import adminProductController from '../controllers/admin-product.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import { upload } from '../middleware/upload.js';
import storeInfoCardController from '../controllers/store-info-card.controller.js';

const router = Router();

router.use(verifyToken, verifyAdmin);

router.get('/users', adminController.listarUsuarios);
router.delete('/users/:id', adminController.removerUsuario);
router.patch('/users/:id/role', adminController.atualizarRole);
router.post('/products', upload.single('image'), adminProductController.create);
router.patch('/products/:id', upload.single('image'), adminProductController.update);
router.delete('/products/:id', adminProductController.remove);
router.get('/store-info/cards', storeInfoCardController.list);
router.post('/store-info/cards', storeInfoCardController.create);
router.put('/store-info/cards/:id', storeInfoCardController.update);
router.delete('/store-info/cards/:id', storeInfoCardController.remove);

export default router;
