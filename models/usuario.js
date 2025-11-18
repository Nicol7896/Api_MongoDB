const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    usuario: String,
    contraseña: String,
    membresia: String
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
