const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Producto = require('../models/Producto');

const producto_Get = async (req, res = response) => {

    const retQuery = await Producto.find();



    res.status(200).json({
        retQuery
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
const producto_Delete = (req, res = response) => {
    res.status(200).json({
        message: "DELETE API - Controller"
    })
}

module.exports = {
    producto_Get,
    producto_Post,
    producto_Put,
    producto_Delete
};