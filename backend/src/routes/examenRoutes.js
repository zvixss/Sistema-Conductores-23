const express = require("express");

const router = express.Router();

const {
    agendarExamen,
    obtenerMunicipalidadUsuario,
    obtenerTodasMunicipalidades
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

router.get(
    "/municipalidades",
    verificarToken,
    obtenerTodasMunicipalidades
);


module.exports = router;