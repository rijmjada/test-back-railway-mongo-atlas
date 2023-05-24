const { Router } = require('express');
const {
    usuario_Get,
    usuario_Post,
    usuario_Put,
    usuario_Delete, } = require('../controllers/usuario-controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarEmail, existeUsuarioPorID } = require('../helpers/db-validators');

const router = Router();



router.get('/', usuario_Get);

router.post('/', [
    check('nombre', 'Middlewares: El nombre es obligatorio, minimo: 3 letras').isLength({ min: 3 }),
    check('password', 'Middlewares: El password es obligatorio, minimo: 6 caracteres (solo letras y numeros)').isAlphanumeric().isLength({ min: 6 }),
    check('correo', 'Middlewares: El correo no es valido').isEmail(),
    check('rol', 'Middlewares: No es un rol válido (ADMIN_ROLE, USER_ROLE)').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(validarEmail),
    validarCampos
], usuario_Post);

router.put('/:id',[
    check('id','Middlewares: No es un MongoID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuario_Put);

router.delete('/:id', usuario_Delete);



// Exportar Modulo Router
module.exports = router;