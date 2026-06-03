const express = require("express");

const router = express.Router();

const {
    agendarExamen
} = require("../controllers/examenController");

const verificarToken =
require("../middleware/authMiddleware");

router.post(
    "/agendar",
    verificarToken,
    agendarExamen
);

module.exports = router;