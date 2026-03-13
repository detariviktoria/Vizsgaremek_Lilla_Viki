const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Kép feltöltése a szerverre
 *     tags: [Feltöltés]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Sikeres feltöltés
 */
router.post('/', uploadController.uploadImage, uploadController.handleUpload);

module.exports = router;
