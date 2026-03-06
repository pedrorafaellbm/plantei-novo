import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import loginRateLimit from '../middlewares/loginRateLimit.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', loginRateLimit, authController.login);
router.get('/me', verifyToken, authController.me);

export default router;
