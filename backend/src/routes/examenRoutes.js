const express = require("express");

const router = express.Router();

const {
    agendarExamen,
    obtenerMunicipalidadUsuario
} = require("../controllers/examenController");

const verificarToken =
require("../middleware/authMiddleware");

router.post(
    "/agendar",
    verificarToken,
    agendarExamen
);

router.get(
    "/municipalidad-usuario",
    verificarToken,
    obtenerMunicipalidadUsuario
);

module.exports = router;