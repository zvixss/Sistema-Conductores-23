const verificarAdmin = (req, res, next) => {

    if (req.usuario.rol !== "admin") {

        return res.status(403).json({
            mensaje: "ACCESO DENEGADO"
        });

    }

    next();

};

module.exports = verificarAdmin;