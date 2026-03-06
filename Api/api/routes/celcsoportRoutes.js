const express = require('express');
const router = express.Router();
const celcsoportController = require('../controllers/celcsoportController');

router.get('/', celcsoportController.getCelcsoportok);
router.post('/', celcsoportController.createCelcsoport);
router.delete('/:id', celcsoportController.deleteCelcsoport);

module.exports = router;