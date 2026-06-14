const db = require("../config/db");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "conducefacil.pucv@gmail.com",
        pass: "zdjd mgwq yxai ukxd"
    }
});

const enviarCorreoAviso = (usuarioId, asunto, texto) => {
    db.query(`SELECT correo, nombreUsuario FROM usuarios WHERE id = ?`, [usuarioId], (err, res) => {
        if (!err && res.length > 0) {
            const correoDestino = res[0].correo;
            const nombre = res[0].nombreUsuario;
            
            const mailOptions = {
                from: "ConduceFácil <conducefacil.pucv@gmail.com>",
                to: correoDestino,
                subject: asunto,
                text: `Hola ${nombre},\n\n${texto}\n\nSaludos cordiales,\nEquipo ConduceFácil.`
            };

            transporter.sendMail(mailOptions, (mailErr) => {
                if (mailErr) console.log("Error enviando correo:", mailErr);
                else console.log("Correo enviado exitosamente a:", correoDestino);
            });
        }
    });
};

const crearNotificacion = (usuarioId, titulo, mensaje, tipo) => {
    const query = `INSERT INTO notificaciones (usuario_id, titulo, mensaje, tipo) VALUES (?, ?, ?, ?)`;
    db.query(query, [usuarioId, titulo, mensaje, tipo], (err) => {
        if (err) console.error(err);
    });
};

const agendarExamen = (req, res) => {
    const usuarioId = req.usuario.id;
    const { tipo_examen, fecha, hora, id_municipalidad } = req.body;

    if (!tipo_examen || !fecha || !hora || !id_municipalidad) {
        return res.status(400).json({ mensaje: "TODOS LOS CAMPOS SON OBLIGATORIOS" });
    }

    const fechaSeleccionada = new Date(`${fecha}T${hora}`);
    const hoy = new Date();
    if (fechaSeleccionada < hoy) {
        return res.status(400).json({ mensaje: "NO PUEDES AGENDAR EN UNA FECHA U HORA PASADA" });
    }

    const queryVerificar = `
        SELECT * FROM examenes 
        WHERE fecha = ? AND hora = ? AND estado != 'cancelado'
    `;

    db.query(queryVerificar, [fecha, hora], (error, resultados) => {
        if (error) return res.status(500).json({ mensaje: "ERROR DEL SERVIDOR" });
        if (resultados.length > 0) return res.status(400).json({ mensaje: "HORARIO NO DISPONIBLE" });

        const queryInsert = `
            INSERT INTO examenes (usuario_id, tipo_examen, fecha, hora, id_municipalidad)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(queryInsert, [usuarioId, tipo_examen, fecha, hora, id_municipalidad], (error) => {
            if (error) return res.status(500).json({ mensaje: "ERROR AL AGENDAR" });
            
            crearNotificacion(usuarioId, "Examen Agendado", `Tu examen de ${tipo_examen} para el ${fecha} a las ${hora} ha sido confirmado.`, "sistema");
            enviarCorreoAviso(usuarioId, "🚗 ¡Reserva Confirmada en ConduceFácil!", `Tu examen de "${tipo_examen}" ha sido agendado exitosamente para el día ${fecha} a las ${hora}.\n\n¡Te esperamos con puntualidad!`);

            res.status(201).json({ mensaje: "EXAMEN AGENDADO" });
        });
    });
};

const obtenerMunicipalidadUsuario = (req, res) => {
    const usuarioId = req.usuario.id;
    const query = `
        SELECT m.id_municipalidad, m.nombre_municipalidad, m.comuna, m.direccion
        FROM usuarios u
        INNER JOIN municipalidades m ON u.comuna = m.comuna
        WHERE u.id = ?
    `;

    db.query(query, [usuarioId], (error, resultados) => {
        if (error) return res.status(500).json({ mensaje: "ERROR DEL SERVIDOR" });
        if (resultados.length === 0) return res.status(404).json({ mensaje: "MUNICIPALIDAD NO ENCONTRADA" });
        res.json(resultados[0]);
    });
};

const obtenerTodasMunicipalidades = (req, res) => {
    const query = `SELECT * FROM municipalidades`;
    db.query(query, (error, resultados) => {
        if (error) return res.status(500).json({ mensaje: "ERROR DEL SERVIDOR" });
        res.status(200).json(resultados);
    });
};

const reprogramarExamen = (req, res) => {
    const { id } = req.params;
    const usuarioId = req.usuario.id;
    const { fecha, hora } = req.body;

    if (!fecha || !hora) return res.status(400).json({ mensaje: "LA FECHA Y HORA SON OBLIGATORIAS" });

    const fechaSeleccionada = new Date(`${fecha}T${hora}`);
    const hoy = new Date();
    if (fechaSeleccionada < hoy) {
        return res.status(400).json({ mensaje: "NO PUEDES REPROGRAMAR PARA UNA FECHA U HORA PASADA" });
    }

    const queryVerificar = `
        SELECT * FROM examenes 
        WHERE fecha = ? AND hora = ? AND estado != 'cancelado' AND id != ?
    `;

    db.query(queryVerificar, [fecha, hora, id], (error, resultados) => {
        if (error) return res.status(500).json({ mensaje: "ERROR DEL SERVIDOR" });
        if (resultados.length > 0) return res.status(400).json({ mensaje: "EL NUEVO HORARIO YA ESTÁ OCUPADO" });

        const queryUpdate = `
            UPDATE examenes 
            SET fecha = ?, hora = ? 
            WHERE id = ? AND usuario_id = ?
        `;

        db.query(queryUpdate, [fecha, hora, id, usuarioId], (err, result) => {
            if (err) return res.status(500).json({ mensaje: "ERROR AL REPROGRAMAR" });
            
            crearNotificacion(usuarioId, "Examen Reprogramado", `Tu examen ha sido reprogramado exitosamente para el ${fecha} a las ${hora}.`, "sistema");
            enviarCorreoAviso(usuarioId, "📅 Actualización de tu Reserva", `Te confirmamos que tu hora de examen de conducción ha sido reprogramada con éxito. Tu nueva fecha es el ${fecha} a las ${hora}.`);

            res.status(200).json({ mensaje: "EXAMEN REPROGRAMADO EXITOSAMENTE" });
        });
    });
};

const cancelarExamen = (req, res) => {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    const queryDelete = `
        DELETE FROM examenes 
        WHERE id = ? AND usuario_id = ?
    `;

    db.query(queryDelete, [id, usuarioId], (error, result) => {
        if (error) return res.status(500).json({ mensaje: "ERROR AL CANCELAR" });
        
        crearNotificacion(usuarioId, "Examen Cancelado", "Tu hora de examen de conducción ha sido cancelada correctamente.", "sistema");
        enviarCorreoAviso(usuarioId, "❌ Cancelación de Reserva", `Te informamos que tu reserva de examen de conducción ha sido cancelada exitosamente en nuestro sistema.`);

        res.status(200).json({ mensaje: "EXAMEN CANCELADO CORRECTAMENTE" });
    });
};

module.exports = {
    agendarExamen,
    obtenerTodasMunicipalidades,
    obtenerMunicipalidadUsuario,
    reprogramarExamen,
    cancelarExamen
};