const express = require("express");
const router = express.Router();

const {
    agendarExamen,
    obtenerMunicipalidadUsuario,
    obtenerTodasMunicipalidades,
    reprogramarExamen,
    cancelarExamen
} = require("../controllers/examenController");

const verificarToken = require("../middleware/authMiddleware");

router.post("/agendar", verificarToken, agendarExamen);
router.get("/municipalidades", verificarToken, obtenerTodasMunicipalidades);
router.get("/municipalidad-usuario", verificarToken, obtenerMunicipalidadUsuario);

router.put("/reprogramar/:id", verificarToken, reprogramarExamen);
router.delete("/cancelar/:id", verificarToken, cancelarExamen);

module.exports = router;