const express = require('express');
const router = express.Router();

const { PizzasController } = require('../controllers')

router.get('/', PizzasController.index);
router.get('/:id', PizzasController.show);
router.post('/', PizzasController.store);
router.put('/:id', PizzasController.edit);
router.delete('/:id', PizzasController.delete);

module.exports = router;
