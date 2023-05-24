const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeProductoPorID } = require('../helpers/db-validators');

const {
    producto_Get,
    producto_Post,
    producto_Put,
    producto_Delete } = require('../controllers/producto-controller');

const router = Router();



router.get('/', producto_Get);

router.post('/', producto_Post);

router.put('/', producto_Put);

router.delete('/:id', [
    check('id', 'Middlewares: No es un MongoID valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], producto_Delete);



// Exportar Modulo Router
module.exports = router;