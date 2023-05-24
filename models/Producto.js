const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    autor: {
        type: String,
        required: [true, 'el autor es requerido']
    },

    titulo: {
        type: String,
        required: [true, 'el titulo es requerido']
    },

    genero: {
        type: String,
        required: [true, 'el genero es requerido']
    },

    precio: {
        type: Number,
        required: [true, 'el precio es requerido']
    },

    img: {
        type: String,
    },

    cantidad: {
        type: Number,
        required: [true, 'la cantidad es requerida']
    },

    estado: {
        type: Boolean,
        default: true
    },

});

ProductoSchema.methods.toJSON = function() {
    const { __v, ...producto } = this.toObject();
    return producto;
}
module.exports = model('Producto', ProductoSchema);