const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/usuario", usuarioController.criar);
router.put("/usuario/:id", usuarioController.atualizar);
router.get("/usuario/:id", usuarioController.buscarPorId);

module.exports = router;
