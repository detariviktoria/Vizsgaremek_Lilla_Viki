const express = require('express');
const router = express.Router();
const kuponController = require('../controllers/kuponController');

router.get('/', kuponController.getKuponok);
router.post('/', kuponController.createKupon);
router.delete('/:id', kuponController.deleteKupon);
router.get('/:id', kuponController.getKuponById);
router.put('/:id', kuponController.updateKupon);

module.exports = router;
