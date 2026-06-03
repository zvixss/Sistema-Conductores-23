const express =
require("express");

const router =
express.Router();

const verificarToken =
require("../middleware/authMiddleware");

const {

    obtenerNotificaciones

} = require(
    "../controllers/notificacionController"
);

router.get(
    "/",
    verificarToken,
    obtenerNotificaciones
);

module.exports = router;