const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Producto = require('../models/Producto');

const producto_Get = async (req, res = response) => {

    const { autor, titulo, genero } = req.query;

    const condiciones = {};

    if (autor) condiciones.autor = autor;
    if (titulo) condiciones.titulo = titulo;
    if (genero) condiciones.genero = genero;

    const query = await Producto.find(condiciones);

    res.status(200).json({
        query
    })
}


const producto_Post = async (req, res = response) => {

    const { cantidad, autor, titulo, genero, precio, img } = req.body;

    const producto = new Producto({
        autor, titulo, genero, precio, img, cantidad
    });

    await producto.save();

    res.status(200).json({
        message: "POST API - Controller",
        producto
    })
}
const producto_Put = (req, res = response) => {
    res.status(200).json({
        message: "PUT API - Controller"
    })
}
const producto_Delete = async (req, res = response) => {

    const { id } = req.params;

    const query = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json({
        message: "DELETE API - Controller",
        query
    });
}

module.exports = {
    producto_Get,
    producto_Post,
    producto_Put,
    producto_Delete
};