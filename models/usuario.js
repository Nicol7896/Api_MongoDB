const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    documento: { type: String, required: true },
    correo: { type: String, required: true },
    contraseña: { type: String, required: true },
    membresia: { type: String, required: true }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
