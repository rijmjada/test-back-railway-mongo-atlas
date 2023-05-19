const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'el nombre es requerido']
    },

    correo: {
        type: String,
        required: [true, 'el correo es requerido'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'la contraseña es requerida']
    },

    img: {
        type: String,
    },

    rol: {
        type: String,
        required: [true, 'el rol es requerido'],
        enum: ['ADMIN_ROLE','USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    }
});


UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);