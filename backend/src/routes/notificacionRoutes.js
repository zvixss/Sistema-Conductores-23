const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const {
    obtenerNotificaciones,
    borrarNotificacion
} = require("../controllers/notificacionController");

router.get("/", verificarToken, obtenerNotificaciones);
router.delete("/:id", verificarToken, borrarNotificacion);

module.exports = router;