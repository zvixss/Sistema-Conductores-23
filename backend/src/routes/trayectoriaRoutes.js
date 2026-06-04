const express = require("express");

const router = express.Router();

const verificarToken =
require("../middleware/authMiddleware");

const {
    obtenerTrayectoria
} = require("../controllers/trayectoriaController");

router.get(
    "/",
    verificarToken,
    obtenerTrayectoria
);

module.exports = router;