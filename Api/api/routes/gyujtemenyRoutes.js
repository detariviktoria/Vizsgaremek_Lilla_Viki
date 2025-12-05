const express = require('express');
const router = express.Router();
const gyujtemenyController = require('../controllers/gyujtemenyController');

router.get('/', gyujtemenyController.getGyujtemenyek);
router.get('/:id', gyujtemenyController.getGyujtemenyById);
router.post('/', gyujtemenyController.createGyujtemeny);
router.put('/:id', gyujtemenyController.updateGyujtemeny);
router.delete('/:id', gyujtemenyController.deleteGyujtemeny);

module.exports = router;
