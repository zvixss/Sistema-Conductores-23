const verificarAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'admin') {
        next(); 
    } else {
        return res.status(403).json({ mensaje: "ACCESO DENEGADO. SE REQUIEREN PRIVILEGIOS DE ADMINISTRADOR." });
    }
};

module.exports = verificarAdmin;