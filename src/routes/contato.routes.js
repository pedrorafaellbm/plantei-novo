import { Router } from "express";
import contatoController from '../controllers/contato.controller.js';

const router = Router();

router.get("/", contatoController.listar);
router.get("/:id", contatoController.buscarPorId);
router.post("/", contatoController.criar);
router.put("/:id", contatoController.atualizar);
router.patch("/:id", contatoController.patch);
router.delete("/:id", contatoController.remover);

export default router;