const express = require('express');
const router = express.Router();
const kuponController = require('../controllers/kuponController');

router.get('/', kuponController.getKuponok);

module.exports = router;
