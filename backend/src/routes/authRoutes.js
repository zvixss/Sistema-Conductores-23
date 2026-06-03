const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const verificarToken = require("../middleware/authMiddleware");

const verificarAdmin = require("../middleware/adminMiddleware");

const {

    register,

    login

} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.get(
    "/perfil",
    verificarToken,
    authController.perfil
);

router.get(
    "/usuarios",
    verificarToken,
    verificarAdmin,
    authController.obtenerUsuarios
);

router.put(
    "/perfil",
    verificarToken,
    authController.editarUsuario
);

module.exports = router;