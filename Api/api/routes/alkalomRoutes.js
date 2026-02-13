const express = require('express');
const router = express.Router();
const alkalomController = require('../controllers/alkalomController');

router.get('/', alkalomController.getAlkalmak);
router.post('/', alkalomController.createAlkalom);
router.delete('/:id', alkalomController.deleteAlkalom);

module.exports = router;
