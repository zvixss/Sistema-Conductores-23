require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const examenRoutes = require("./routes/examenRoutes");
const notificacionRoutes = require("./routes/notificacionRoutes");
const trayectoriaRoutes = require("./routes/trayectoriaRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(helmet());

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:8100'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/examenes", examenRoutes);
app.use("/api/notificaciones", notificacionRoutes);
app.use("/api/trayectoria", trayectoriaRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor seguro corriendo en puerto ${PORT}`);
});