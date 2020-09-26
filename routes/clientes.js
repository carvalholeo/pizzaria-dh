const express = require('express');
const router = express.Router();

const { ClientesController } = require('../controllers')

router.get('/', ClientesController.index);
router.get('/:id', ClientesController.show);
router.post('/', ClientesController.create);
router.put('/:id', ClientesController.edit);
router.delete('/:id', ClientesController.delete);

module.exports = router;
