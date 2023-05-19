const { Router } = require('express');
const { 
    producto_Get, 
    producto_Post, 
    producto_Put, 
    producto_Delete } = require('../controllers/producto-controller');

const router = Router();



router.get('/', producto_Get);

router.post('/', producto_Post);

router.put('/', producto_Put);

router.delete('/', producto_Delete);



// Exportar Modulo Router
module.exports = router;