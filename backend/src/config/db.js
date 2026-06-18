const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "conducefacil",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
    } else {
        console.log("¡Conectado a la base de datos MySQL con éxito!");
        connection.release();
    }
});

module.exports = db;