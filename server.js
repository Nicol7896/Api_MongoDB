const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());

// Conexión a MongoDB 
mongoose.connect(
  "mongodb+srv://nicol:nicol777@cluster0.2y3lksa.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.log("Error al conectar:", err));

const Usuario = require("./models/usuario");

// Registrar usuario
app.post("/usuarios", async (req, res) => {
    try {
        const nuevo = await Usuario.create(req.body);
        res.json(nuevo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Iniciar sesión
app.post("/login", async (req, res) => {
    const { usuario, contraseña, membresia } = req.body;

    const existe = await Usuario.findOne({ usuario, contraseña, membresia });

    if (!existe) {
        return res.status(400).json({ ok: false, mensaje: "Credenciales incorrectas" });
    }

    res.json({ ok: true, mensaje: "Inicio de sesión exitoso", usuario: existe });
});

// Obtener usuarios 
app.get("/usuarios", async (req, res) => {
    const lista = await Usuario.find();
    res.json(lista);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
