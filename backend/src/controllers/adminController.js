const db = require("../config/db");

const obtenerDetalleUsuario = (req, res) => {

    const { id } = req.params;

    const queryUsuario = `
        SELECT *
        FROM usuarios
        WHERE id = ?
    `;

    const queryLicencias = `
        SELECT *
        FROM licencias
        WHERE usuario_id = ?
    `;

    const queryExamenes = `
        SELECT
            e.*,
            m.nombre_municipalidad
        FROM examenes e
        LEFT JOIN municipalidades m
            ON e.id_municipalidad =
               m.id_municipalidad
        WHERE e.usuario_id = ?
        ORDER BY e.fecha DESC
    `;

    db.query(
        queryUsuario,
        [id],
        (error, usuario) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    mensaje: error.message
                });

            }

            if (usuario.length === 0)
                return res.status(404).json({
                    mensaje:
                    "Usuario no encontrado"
                });

            db.query(
                queryLicencias,
                [id],
                (error, licencias) => {

                    if (error) {

                        console.log(error);

                        return res.status(500).json({
                            mensaje: error.message
                        });

                    }

                    db.query(
                        queryExamenes,
                        [id],
                        (error, examenes) => {

                            if (error) {

                                console.log(error);

                                return res.status(500).json({
                                    mensaje: error.message
                                });

                            }

                            res.json({
                                usuario: usuario[0],
                                licencias,
                                examenes
                            });

                        }
                    );

                }
            );

        }
    );

};

const actualizarExamen = (req, res) => {

    const { id } = req.params;

    const {
        estado,
        resultado
    } = req.body;

    const query = `
        UPDATE examenes
        SET
            estado = ?,
            resultado = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [
            estado,
            resultado,
            id
        ],
        (error) => {

            if (error) {

                return res.status(500).json({
                    mensaje:
                    "Error al actualizar"
                });

            }

            res.json({
                mensaje:
                "Examen actualizado"
            });

        }
    );

};

const eliminarUsuario = (req, res) => {

    const id = req.params.id;

    if (
        Number(idEliminar) === req.usuario.id
    ) {

        return res.status(400).json({
            mensaje:
            "No puede eliminarse a sí mismo"
        });

    }

    db.query(
        `
        DELETE FROM usuarios
        WHERE id = ?
        `,
        [id],
        (error) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "Error"
                });

            }

            res.json({
                mensaje: "Usuario eliminado"
            });

        }
    );

};

module.exports = {

    obtenerDetalleUsuario,

    actualizarExamen,

    eliminarUsuario

};