const express = require('express');
const router = express.Router();
const celcsoportController = require('../controllers/celcsoportController');

/**
 * @swagger
 * /celcsoportok:
 *   get:
 *     summary: Összes célcsoport lekérése
 *     tags: [Célcsoportok]
 *     responses:
 *       200:
 *         description: Célcsoportok listája
 */
router.get('/', celcsoportController.getCelcsoportok);
router.post('/', celcsoportController.createCelcsoport);
router.delete('/:id', celcsoportController.deleteCelcsoport);

/**
 * @swagger
 * /celcsoportok:
 *   post:
 *     summary: Új célcsoport létrehozása
 *     tags: [Célcsoportok]
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
 *         description: Célcsoport létrehozva
 */
router.post('/', celcsoportController.createCelcsoport);

/**
 * @swagger
 * /celcsoportok/{id}:
 *   delete:
 *     summary: Célcsoport törlése
 *     tags: [Célcsoportok]
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
router.delete('/:id', celcsoportController.deleteCelcsoport);

module.exports = router;
