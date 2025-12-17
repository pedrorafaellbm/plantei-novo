import { Router } from "express";
import marcaController from "../controllers/marca.controller.js";

const router = Router();

router.get("/", marcaController.listar);
router.get("/:id", marcaController.buscarPorId);
router.post("/", marcaController.criar);
router.put("/:id", marcaController.atualizar);
router.patch("/:id", marcaController.patch);
router.delete("/:id", marcaController.remover);

export default router;