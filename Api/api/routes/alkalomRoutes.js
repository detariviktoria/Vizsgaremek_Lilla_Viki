const express = require('express');
const router = express.Router();
const alkalomController = require('../controllers/alkalomController');

/**
 * @swagger
 * /alkalmak:
 *   get:
 *     summary: Összes alkalom lekérése
 *     tags: [Alkalmak]
 *     responses:
 *       200:
 *         description: Alkalmak listája
 */
router.get('/', alkalomController.getAlkalmak);

/**
 * @swagger
 * /alkalmak:
 *   post:
 *     summary: Új alkalom létrehozása
 *     tags: [Alkalmak]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nev:
 *                 type: string
 *     responses:
 *       201:
 *         description: Alkalom létrehozva
 */
router.post('/', alkalomController.createAlkalom);

/**
 * @swagger
 * /alkalmak/{id}:
 *   delete:
 *     summary: Alkalom törlése
 *     tags: [Alkalmak]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sikeres törlés
 */
router.delete('/:id', alkalomController.deleteAlkalom);

module.exports = router;
