import { Router } from 'express';
import { criarContato } from '../controllers/contato.controller.js';

const router = Router();

router.post('/', criarContato);

export default router;