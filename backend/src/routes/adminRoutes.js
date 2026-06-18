const express = require("express");
const router = express.Router();
const { obtenerUsuarios, obtenerDetalleUsuario, eliminarUsuario } = require("../controllers/adminController");
const verificarToken = require("../middleware/authMiddleware");
const verificarAdmin = require("../middleware/adminMiddleware");

router.get("/usuarios", verificarToken, verificarAdmin, obtenerUsuarios);
router.get("/usuarios/:id", verificarToken, verificarAdmin, obtenerDetalleUsuario);
router.delete("/usuarios/:id", verificarToken, verificarAdmin, eliminarUsuario);

module.exports = router;