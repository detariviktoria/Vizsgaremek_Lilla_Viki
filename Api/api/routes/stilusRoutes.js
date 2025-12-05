const express = require('express');
const router = express.Router();
const stilusController = require('../controllers/stilusController');

router.get('/', stilusController.getStilusok);

module.exports = router;
