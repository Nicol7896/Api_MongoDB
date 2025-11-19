const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(
  "mongodb+srv://nicol:nicol777@cluster0.2y3lksa.mongodb.net/aplicacion",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.log("Error al conectar:", err));

// importar modelo
const Usuario = require("./models/usuario");


//registro de usuario
app.post("/register", async (req, res) => {
  try {
    const { usuario, documento, correo, contraseña, membresia } = req.body;

    // validación
    if (!usuario || !documento || !correo || !contraseña || !membresia) {
      return res.json({ ok: false, mensaje: "Todos los campos son obligatorios" });
    }

    //verificar si el usuario ya existe
    const existente = await Usuario.findOne({ usuario });
    if (existente) {
      return res.json({ ok: false, mensaje: "El usuario ya existe" });
    }

 //registrar nuevo usuario
    const nuevoUsuario = await Usuario.create({
      usuario,
      documento,
      correo,
      contraseña,
      membresia
    });

    res.json({ ok: true, mensaje: "Registro exitoso", usuario: nuevoUsuario });

  } catch (err) {
    res.status(500).json({ ok: false, mensaje: err.message });
  }
});


//inicio de sesión
app.post("/login", async (req, res) => {
  const { usuario, contraseña, membresia } = req.body;

  const existe = await Usuario.findOne({ usuario, contraseña, membresia });

  if (!existe) {
    return res.json({ ok: false, mensaje: "Credenciales incorrectas" });
  }

  res.json({ ok: true, mensaje: "Inicio de sesión exitoso", usuario: existe });
});


// obtener lista de usuarios
app.get("/usuarios", async (req, res) => {
  const lista = await Usuario.find();
  res.json(lista);
});


// servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
