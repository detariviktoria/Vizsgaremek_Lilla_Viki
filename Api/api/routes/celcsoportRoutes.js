const express = require('express');
const router = express.Router();
const celcsoportController = require('../controllers/celcsoportController');

router.get('/', celcsoportController.getCelcsoportok);

module.exports = router;