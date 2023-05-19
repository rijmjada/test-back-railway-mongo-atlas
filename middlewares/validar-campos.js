const { request, response } = require('express');
const { validationResult } = require('express-validator');


const validarCampos = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json(errors);
    }
    next();
    
}

module.exports = {
    validarCampos,
}