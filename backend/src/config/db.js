const mysql = require("mysql2");

const conexion = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",

    database: "conducefacil"

});

conexion.connect((error) => {

    if (error) {

        console.log("Error MySQL");

        console.log(error);

        return;

    }

    console.log("MySQL conectado");

});

module.exports = conexion;