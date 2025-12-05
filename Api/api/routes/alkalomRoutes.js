const express = require('express');
const router = express.Router();
const alkalomController = require('../controllers/alkalomController');

router.get('/', alkalomController.getAlkalmak);

module.exports = router;
