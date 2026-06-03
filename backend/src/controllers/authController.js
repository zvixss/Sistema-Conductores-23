const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const db = require("../config/db");

const queryInsert = `
    INSERT INTO usuarios
    (
        nombreUsuario,
        rut,
        correo,
        telefono,
        region,
        comuna,
        password
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

const obtenerUsuarios = (req, res) => {

    const query = `
        SELECT
            id,
            nombreUsuario,
            rut,
            correo,
            telefono,
            region,
            comuna,
            rol,
            fechaRegistro
        FROM usuarios
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

            res.status(200).json({
                usuarios: resultados
            });

        }
    );

};

const register = async (req, res) => {

    console.log(req.body);

    try {

        const {
        nombreUsuario,
        rut,
        correo,
        telefono,
        password,
        confirmPassword,
        region,
        comuna
        } = req.body;

        if (
        !nombreUsuario ||
        !rut ||
        !correo ||
        !telefono ||
        !password ||
        !confirmPassword ||
        !region ||
        !comuna
        ) {

        return res.status(400).json({
            mensaje: "TODOS LOS CAMPOS SON OBLIGATORIOS"
        });

        }

        const regexRut =
            /^\d{7,8}-[\dkK]$/;

            if (!regexRut.test(rut)) {

                return res.status(400).json({
                    mensaje: "FORMATO DE RUT INVÁLIDO"
                });

            }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexCorreo.test(correo)) {

            return res.status(400).json({
                mensaje: "CORREO INVÁLIDO"
            });

        }

        const regexTelefono = /^[0-9]{9}$/;

        if (!regexTelefono.test(telefono)) {

            return res.status(400).json({
                mensaje: "TELÉFONO INVÁLIDO"
            });

        }

        const regexPassword =
        /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!regexPassword.test(password)) {

            return res.status(400).json({
                mensaje:
                "LA CONTRASEÑA DEBE TENER AL MENOS 8 CARACTERES, UNA MAYÚSCULA Y UN NÚMERO"
            });

        }

        if (password !== confirmPassword) {

        return res.status(400).json({
            mensaje: "LAS CONTRASEÑAS NO COINCIDEN"
        });

        }

        const queryBuscar = `
            SELECT *
            FROM usuarios
            WHERE correo = ?
            OR rut = ?
            OR nombreUsuario = ?
            `;

        db.query(
            queryBuscar,
            [correo, rut, nombreUsuario],
            async (error, resultados) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje: "ERROR DEL SERVIDOR"
                    });

                }

                if (resultados.length > 0) {

                    return res.status(400).json({
                        mensaje: "EL USUARIO YA EXISTE"
                    });

                }

                const passwordHash = await bcrypt.hash(password, 10);

                db.query(
                    queryInsert,
                    [
                        nombreUsuario,
                        rut,
                        correo,
                        telefono,
                        region,
                        comuna,
                        passwordHash
                    ],

                    (error, resultado) => {

                        if(error){

                            console.log(error);

                            return res.status(500).json({
                                mensaje: "ERROR AL REGISTRAR USUARIO"
                            });
                        }

                        console.log("Usuario registrado");

                        res.status(201).json({
                            mensaje: "Usuario registrado correctamente"
                        });

                    }
                );

            }
        );

    } catch (error) {

    res.status(500).json({
      mensaje: "ERROR DEL SERVIDOR"
    });

  }

};

const login = async (req, res) => {

    try {

        const { identificador, password } = req.body;

        const queryLogin = `
            SELECT *
            FROM usuarios
            WHERE correo = ?
            OR rut = ?
            OR nombreUsuario = ?
            `;

        db.query(
            queryLogin,
            [identificador, identificador, identificador],
            async (error, resultados) => {

                if (error) {

                    return res.status(500).json({
                        mensaje: "ERROR DEL SERVIDOR"
                    });

                }

                if (resultados.length === 0) {

                    return res.status(404).json({
                        mensaje: "EL USUARIO NO EXISTE"
                    });

                }

                const usuario = resultados[0];

                const passwordCorrecta = await bcrypt.compare(
                    password,
                    usuario.password
                );

                if (!passwordCorrecta) {

                    return res.status(401).json({
                        mensaje: "CONTRASEÑA INCORRECTA"
                    });

                }

                const token = jwt.sign(
                    {
                        id: usuario.id,
                        rol: usuario.rol
                    },
                    "secreto",
                    {
                        expiresIn: "1h"
                    }
                );

                res.status(200).json({

                    mensaje: "LOGIN EXITOSO",

                    token,

                    usuario: {

                        id: usuario.id,

                        nombreUsuario: usuario.nombreUsuario,

                        correo: usuario.correo,

                        rol: usuario.rol,

                        comuna: usuario.comuna,

                        region: usuario.region

                    }

                });

            }
        );

    } catch (error) {

        res.status(500).json({
        mensaje: "ERROR DEL SERVIDOR"
        });

    }

};

const perfil = (req, res) => {

    const usuarioId = req.usuario.id;

    const queryPerfil = `
        SELECT
            id,
            nombreUsuario,
            rut,
            correo,
            telefono,
            region,
            comuna
        FROM usuarios
        WHERE id = ?
    `;

    db.query(
        queryPerfil,
        [usuarioId],
        (error, resultados) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "ERROR DEL SERVIDOR"
                });

            }

            if (resultados.length === 0) {

                return res.status(404).json({
                    mensaje: "USUARIO NO ENCONTRADO"
                });

            }

            res.status(200).json({
                usuario: resultados[0]
            });

        }
    );

};

const editarUsuario = async (req, res) => {

    const usuarioId = req.usuario.id;

    const {
        nombreUsuario,
        telefono,
        correo,
        region,
        comuna,
        password,
        confirmPassword
    } = req.body;

    if (
        !nombreUsuario ||
        !correo ||
        !telefono ||
        !password ||
        !confirmPassword ||
        !region ||
        !comuna
    ) {

        return res.status(400).json({
            mensaje: "TODOS LOS CAMPOS SON OBLIGATORIOS"
        });

    }

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

    if (!regexNombre.test(nombreUsuario)) {

        return res.status(400).json({
            mensaje:
            "EL NOMBRE SOLO PUEDE CONTENER LETRAS Y ESPACIOS"
        });

    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(correo)) {

        return res.status(400).json({
            mensaje: "CORREO INVÁLIDO"
        });

    }

    const regexTelefono = /^[0-9]{9}$/;

    if (!regexTelefono.test(telefono)) {

        return res.status(400).json({
            mensaje: "TELÉFONO INVÁLIDO"
        });

    }

    if (password) {

        const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!regexPassword.test(password)) {

            return res.status(400).json({
                mensaje:
                "LA CONTRASEÑA DEBE TENER AL MENOS 8 CARACTERES, UNA MAYÚSCULA Y UN NÚMERO"
            });

        }

    }

    const queryVerificar = `
        SELECT id
        FROM usuarios
        WHERE (
            correo = ?
            OR nombreUsuario = ?
        )
        AND id != ?
    `;

    db.query(
        queryVerificar,
        [correo, nombreUsuario, usuarioId],
        async (error, resultados) => {

            if (error) {

                return res.status(500).json({
                    mensaje: "ERROR DEL SERVIDOR"
                });

            }

            if (resultados.length > 0) {

                return res.status(400).json({
                    mensaje:
                    "EL CORREO O NOMBRE DE USUARIO YA ESTÁN EN USO"
                });

            }

            if (password !== confirmPassword) {

                return res.status(400).json({
                    mensaje: "LAS CONTRASEÑAS NO COINCIDEN"
                });

            }

            let passwordHash = null;

            if (password) {

                passwordHash = await bcrypt.hash(password, 10);

            }

            const query = `
                UPDATE usuarios
                SET
                    nombreUsuario = ?,
                    telefono = ?,
                    correo = ?,
                    region = ?,
                    comuna = ?,
                    password = ?
                WHERE id = ?
            `;

            db.query(
                query,
                [
                    nombreUsuario,
                    telefono,
                    correo,
                    region,
                    comuna,
                    passwordHash,
                    usuarioId
                ],
                (error) => {

                    if (error) {

                        return res.status(500).json({
                            mensaje: "ERROR AL ACTUALIZAR"
                        });

                    }

                    res.status(200).json({
                        mensaje: "Usuario Actualizado"
                    });

                }
            );

        }
    );

};

module.exports = {

    obtenerUsuarios,

    register,

    login,

    perfil,

    editarUsuario

};