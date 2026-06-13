const db = require("../config/db");

const obtenerTrayectoria = (req, res) => {
    const usuarioId = req.usuario.id;

    const queryExamenes = `
        SELECT id, tipo_examen, fecha, hora, resultado 
        FROM examenes 
        WHERE usuario_id = ? 
        ORDER BY fecha DESC
    `;

    const queryLicencias = `
        SELECT clase, fecha_emision, fecha_vencimiento, estado 
        FROM licencias 
        WHERE usuario_id = ? 
        ORDER BY fecha_emision DESC
    `;

    db.query(queryExamenes, [usuarioId], (error, examenes) => {
        if (error) {
            return res.status(500).json({ mensaje: "Error al obtener exámenes" });
        }

        console.log("EXÁMENES DESDE LA BASE DE DATOS:", examenes);

        db.query(queryLicencias, [usuarioId], (error, licencias) => {
            if (error) {
                return res.status(500).json({ mensaje: "Error al obtener licencias" });
            }

            res.json({ examenes, licencias });
        });
    });
};

module.exports = {
    obtenerTrayectoria
};