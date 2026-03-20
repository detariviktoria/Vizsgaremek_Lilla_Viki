const express = require('express');
const router = express.Router();
const kuponController = require('../controllers/kuponController');

router.get('/', kuponController.getKuponok);
router.get('/user/:userId', kuponController.getKuponokByUser);

module.exports = router;
