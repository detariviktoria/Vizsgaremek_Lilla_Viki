const express = require('express');
const router = express.Router();
const kategoriaController = require('../controllers/kategoriaController');

router.get('/', kategoriaController.getKategoriak);
router.get('/:id', kategoriaController.getKategoriaById);
router.post('/', kategoriaController.createKategoria);
router.put('/:id', kategoriaController.updateKategoria);
router.delete('/:id', kategoriaController.deleteKategoria);

module.exports = router;
