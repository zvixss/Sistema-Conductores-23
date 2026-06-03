const express = require("express");

const cors = require("cors");

require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = 3000;

app.listen(PORT, () => {

  console.log(`Servidor corriendo en puerto ${PORT}`);

});

const examenRoutes =
require("./routes/examenRoutes");

app.use(
    "/api/examenes",
    examenRoutes
);