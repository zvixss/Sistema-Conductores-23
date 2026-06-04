const db = require("../config/db");

const generarRecordatorios = (usuarioId) => {

    const query = `
        SELECT *
        FROM examenes
        WHERE usuario_id = ?
        AND estado = 'pendiente'
    `;

    db.query(
        query,
        [usuarioId],
        (error, examenes) => {

            if (error) return;

            const hoy = new Date();

            examenes.forEach((examen) => {

                const fechaExamen =
                    new Date(examen.fecha);

                const diferenciaDias =
                    Math.ceil(
                        (fechaExamen - hoy)
                        /
                        (1000 * 60 * 60 * 24)
                    );

                let titulo = "";
                let mensaje = "";
                let tipo = "";

                if (diferenciaDias === 7) {

                    titulo =
                        "Examen Próximo";

                    mensaje =
                        "Su examen será dentro de 7 días.";

                    tipo =
                        "recordatorio_7";

                }

                if (diferenciaDias === 1) {

                    titulo =
                        "Examen Mañana";

                    mensaje =
                        `Su examen será mañana a las ${examen.hora}`;

                    tipo =
                        "recordatorio_1";

                }

                if (diferenciaDias === 0) {

                    titulo =
                        "Examen Hoy";

                    mensaje =
                        `Recuerde que hoy tiene examen a las ${examen.hora}`;

                    tipo =
                        "recordatorio_hoy";

                }

                if (!tipo) return;

                const verificar = `
                    SELECT *
                    FROM notificaciones
                    WHERE usuario_id = ?
                    AND tipo = ?
                `;

                db.query(
                    verificar,
                    [usuarioId, tipo],
                    (error, existe) => {

                        if (error) {

                            console.log(error);
                            return;

                        }

                        if (
                            existe.length > 0
                        ) return;

                        db.query(
                            `
                            INSERT INTO notificaciones
                            (
                                usuario_id,
                                titulo,
                                mensaje,
                                tipo
                            )
                            VALUES (?, ?, ?, ?)
                            `,
                            [
                                usuarioId,
                                titulo,
                                mensaje,
                                tipo
                            ]
                        );

                    }
                );

            });

        }
    );

};

const obtenerNotificaciones = (
    req,
    res
) => {

    const usuarioId =
        req.usuario.id;

    generarRecordatorios(usuarioId);

    db.query(
        `
        SELECT *
        FROM notificaciones
        WHERE usuario_id = ?
        ORDER BY fecha_creacion DESC
        `,
        [usuarioId],
        (error, resultados) => {

            if (error) {

                return res.status(500)
                .json({
                    mensaje:
                    "ERROR DEL SERVIDOR"
                });

            }

            res.json({
                notificaciones:
                resultados
            });

        }
    );

};

module.exports = {

    obtenerNotificaciones

};