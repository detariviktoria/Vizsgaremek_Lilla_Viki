const express = require('express');
const router = express.Router();
const stilusController = require('../controllers/stilusController');

/**
 * @swagger
 * /stilusok:
 *   get:
 *     summary: Összes stílus lekérése
 *     tags: [Stílusok]
 *     responses:
 *       200:
 *         description: Stílusok listája
 */
router.get('/', stilusController.getStilusok);

/**
 * @swagger
 * /stilusok:
 *   post:
 *     summary: Új stílus létrehozása
 *     tags: [Stílusok]
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
 *         description: Stílus létrehozva
 */
router.post('/', stilusController.createStilus);

/**
 * @swagger
 * /stilusok/{id}:
 *   delete:
 *     summary: Stílus törlése
 *     tags: [Stílusok]
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
router.delete('/:id', stilusController.deleteStilus);

module.exports = router;
