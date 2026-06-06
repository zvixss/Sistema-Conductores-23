const express = require("express");

const router = express.Router();

const verificarToken =
require("../middleware/authMiddleware");

const {
    obtenerDetalleUsuario,
    actualizarExamen,
    eliminarUsuario
} = require("../controllers/adminController");

router.get(
    "/usuario/:id",
    verificarToken,
    obtenerDetalleUsuario
);

router.put(
    "/examen/:id",
    verificarToken,
    actualizarExamen
);

router.delete(
    "/usuario/:id",
    verificarToken,
    eliminarUsuario
);

module.exports = router;