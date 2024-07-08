const mongoose = require('mongoose');

// Define el esquema de usuario
const userSchema = new mongoose.Schema({
    din: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    primerApellido: {
        type: String,
        required: true
    },
    segundoApellido: {
        type: String
    },
    naf: {
        type: String,
        required: true
    },
    contrato: {
        type: String,
        required: true
    }
});

// Crea el modelo de usuario basado en el esquema definido
const User = mongoose.model('User', userSchema);

module.exports = User;
