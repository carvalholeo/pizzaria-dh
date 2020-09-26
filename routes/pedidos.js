const express = require('express');
const router = express.Router();

const {PedidosController} = require('../controllers')

router.get('/', PedidosController.index)
router.get('/:id', PedidosController.show);
router.post('/', PedidosController.store);
router.delete('/:id', PedidosController.destroy);

module.exports = router;
