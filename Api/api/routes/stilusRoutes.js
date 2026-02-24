const express = require('express');
const router = express.Router();
const stilusController = require('../controllers/stilusController');

router.get('/', stilusController.getStilusok);
router.post('/', stilusController.createStilus);
router.delete('/:id', stilusController.deleteStilus);

module.exports = router;
