const Usuario = require('../models/Usuario')
const Producto = require('../models/Producto')


const validarEmail = async (correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: '${correo} ya esta registrado en la BD'`);
    }
}

const existeUsuarioPorID = async (id = '') => {
    const existeID = await Usuario.findById(id);
    if (!existeID) {
        throw new Error(`El id: '${id} no corresponde a ningun usuario registrado en la BD'`);
    }
}

const existeProductoPorID = async (id = '') => {
    const existeID = await Producto.findById(id);
    if (!existeID) {
        throw new Error(`El id: '${id} no corresponde a ningun producto registrado en la BD'`);
    }
}

module.exports = {
    validarEmail,
    existeUsuarioPorID,
    existeProductoPorID
}