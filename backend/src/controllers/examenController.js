const db = require("../config/db");

const agendarExamen = (req, res) => {

    const usuarioId = req.usuario.id;

    const {
        tipo_examen,
        fecha,
        hora,
        ubicacion
    } = req.body;

    if (
        !tipo_examen ||
        !fecha ||
        !hora ||
        !ubicacion
    ) {

        return res.status(400).json({
            mensaje: "TODOS LOS CAMPOS SON OBLIGATORIOS"
        });

    }

    const queryVerificar = `
        SELECT *
        FROM examenes
        WHERE fecha = ?
        AND hora = ?
        AND ubicacion = ?
        AND estado != 'cancelado'
    `;

    db.query(
        queryVerificar,
        [fecha, hora, ubicacion],
        (error, resultados) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "ERROR DEL SERVIDOR"
                });

            }

            if (resultados.length > 0) {

                return res.status(400).json({
                    mensaje:
                    "HORARIO NO DISPONIBLE"
                });

            }

        }
    );

    const queryInsert = `
        INSERT INTO examenes
        (
            usuario_id,
            tipo_examen,
            fecha,
            hora,
            ubicacion
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        queryInsert,
        [
            usuarioId,
            tipo_examen,
            fecha,
            hora,
            ubicacion
        ],
        (error) => {

            if (error) {

                return res.status(500).json({
                    mensaje:
                    "ERROR AL AGENDAR"
                });

            }

            res.status(201).json({
                mensaje:
                "EXAMEN AGENDADO"
            });

        }
    );
};

module.exports = {

    agendarExamen

};