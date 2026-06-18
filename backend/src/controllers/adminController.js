const db = require("../config/db");

const obtenerUsuarios = (req, res) => {
    const query = `
        SELECT id, nombreUsuario, rut, correo, telefono, region, comuna, rol, fechaRegistro 
        FROM usuarios
    `;
    db.query(query, (error, resultados) => {
        if (error) return res.status(500).json({ mensaje: "ERROR DEL SERVIDOR" });
        res.status(200).json({ usuarios: resultados });
    });
};

const obtenerDetalleUsuario = (req, res) => {
    const { id } = req.params;
    const queryUsuario = `SELECT * FROM usuarios WHERE id = ?`;
    const queryLicencias = `SELECT * FROM licencias WHERE usuario_id = ?`;
    const queryExamenes = `SELECT * FROM examenes WHERE usuario_id = ?`;

    db.query(queryUsuario, [id], (errUsuario, resUsuario) => {
        if (errUsuario) return res.status(500).json({ mensaje: "ERROR DEL SERVIDOR" });
        if (resUsuario.length === 0) return res.status(404).json({ mensaje: "USUARIO NO ENCONTRADO" });

        db.query(queryLicencias, [id], (errLicencias, resLicencias) => {
            if (errLicencias) return res.status(500).json({ mensaje: "ERROR DEL SERVIDOR" });

            db.query(queryExamenes, [id], (errExamenes, resExamenes) => {
                if (errExamenes) return res.status(500).json({ mensaje: "ERROR DEL SERVIDOR" });

                res.status(200).json({
                    usuario: resUsuario[0],
                    licencias: resLicencias,
                    examenes: resExamenes
                });
            });
        });
    });
};

const eliminarUsuario = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM usuarios WHERE id = ?`;
    db.query(query, [id], (error, result) => {
        if (error) return res.status(500).json({ mensaje: "ERROR AL ELIMINAR" });
        res.status(200).json({ mensaje: "USUARIO ELIMINADO CORRECTAMENTE" });
    });
};

module.exports = {
    obtenerUsuarios,
    obtenerDetalleUsuario,
    eliminarUsuario
};