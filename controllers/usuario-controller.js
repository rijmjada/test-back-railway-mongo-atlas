const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');



const usuario_Get = async (req, res = response) => {

    // Si el limite o el desde o vienen en los parametros de la query los defaulteo aqui
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    // ESTE CODIGO EJECUTA UNA TAREA DESPUES DE LA OTRA (- PERFORMANCE)
    // const usuarios = await Usuario.find(query)
    //     .limit(Number(limite))  
    //     .skip(Number(desde));   

    // const total = await Usuario.countDocuments();
    // const totalActivos = await Usuario.countDocuments(query);


    // ESTE CODIGO EJECUTA TODAS LAS TAREAS DE MANERA SINCRONA Y CUANDO TERMINEN TODAS RETORNA LA PROMESA (+ PERFORMANCE)
    // Nota: La desestructuración es por orden de llamadas
    const [usuarios, totalUsuarios, totalActivos] = await Promise.all([
       
        // Usuarios
        Usuario.find(query)
            .limit(Number(limite))  // limite de usuarios que retornara
            .skip(Number(desde)),   // apartir de que usuario en adelante traera

        // Total usuarios
        Usuario.countDocuments(),

        // Total usuarios activos
        Usuario.countDocuments(query)
    ]);

    res.status(200).json({
        totalUsuarios,
        totalActivos,
        usuarios
    });
}


// Alta de Usuario
const usuario_Post = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({
        nombre, correo, password, rol
    });


    // Encriptación de password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(200).json({
        message: "POST API - Controller",
        usuario
    })
}



const usuario_Put = async (req, res = response) => {

    const { id } = req.params;
    const { password, google, ...resto } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    // TODO validar contra base de datos
    if (password) {
        // Encriptación de password
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
    }

    res.status(200).json({
        message: "PUT API - Controller"
    })
}


const usuario_Delete = (req, res = response) => {
    res.status(200).json({
        message: "DELETE API - Controller"
    })

}



module.exports = {
    usuario_Get,
    usuario_Post,
    usuario_Put,
    usuario_Delete,
};