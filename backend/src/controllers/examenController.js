const db = require("../config/db");

const agendarExamen = (req, res) => {

    const usuarioId = req.usuario.id;

    const {
        tipo_examen,
        fecha,
        hora,
        id_municipalidad
    } = req.body;

    if (
        !tipo_examen ||
        !fecha ||
        !hora ||
        !id_municipalidad
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
        AND estado != 'cancelado'
    `;

    db.query(
        queryVerificar,
        [fecha, hora],
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
            id_municipalidad
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
            id_municipalidad
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

const obtenerMunicipalidadUsuario = (req, res) => {

    const usuarioId = req.usuario.id;

    const query = `
        SELECT
            m.id_municipalidad ,
            m.nombre_municipalidad,
            m.comuna,
            m.direccion
        FROM usuarios u
        INNER JOIN municipalidades m
            ON u.comuna = m.comuna
        WHERE u.id = ?
    `;

    db.query(
        query,
        [usuarioId],
        (error, resultados) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    mensaje: "ERROR DEL SERVIDOR"
                });

            }

            console.log(resultados);

            if (resultados.length === 0) {

                console.log(error);

                return res.status(404).json({
                    mensaje: "MUNICIPALIDAD NO ENCONTRADA"
                });

            }

            console.log(resultados);

            res.json(resultados[0]);

        }
    );

};

const obtenerTodasMunicipalidades = (req, res) => {

    const query = `
        SELECT *
        FROM municipalidades
    `;

    db.query(
        query,
        (error, resultados) => {

            if (error) {

                console.log(error);

                return res.status(500).json({
                    mensaje: "ERROR DEL SERVIDOR"
                });

            }

            res.status(200).json(resultados);

        }
    );

};

module.exports = {

    agendarExamen,
    
    obtenerTodasMunicipalidades,

    obtenerMunicipalidadUsuario

};