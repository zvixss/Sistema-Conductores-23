const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            mensaje: "TOKEN NO ENVIADO"
        });

    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            "secreto"
        );

        req.usuario = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: "TOKEN INVÁLIDO"
        });

    }

};

module.exports = verificarToken;