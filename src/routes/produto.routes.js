import { Router } from "express";
import produtoController from "../controllers/produto.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Todas as rotas de produto exigem autenticação/Token
router.use(authMiddleware);

router.get("/", produtoController.listar);
router.get("/:id", produtoController.buscarPorId);
router.post("/", produtoController.criar);
router.put("/:id", produtoController.atualizar);
router.patch("/:id", produtoController.patch);
router.delete("/:id", produtoController.remover);

export default router;
