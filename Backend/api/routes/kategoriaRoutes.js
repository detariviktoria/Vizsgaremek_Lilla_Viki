const express = require('express');
const router = express.Router();
const kategoriaController = require('../controllers/kategoriaController');

/**
 * @swagger
 * /kategoriak:
 *   get:
 *     summary: Összes kategória lekérése
 *     tags: [Kategóriák]
 *     responses:
 *       200:
 *         description: Kategóriák listája
 */
router.get('/', kategoriaController.getKategoriak);

/**
 * @swagger
 * /kategoriak/{id}:
 *   get:
 *     summary: Kategória lekérése ID alapján
 *     tags: [Kategóriák]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kategória adatai
 */
router.get('/:id', kategoriaController.getKategoriaById);

/**
 * @swagger
 * /kategoriak:
 *   post:
 *     summary: Új kategória létrehozása
 *     tags: [Kategóriák]
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
 *         description: Kategória létrehozva
 */
router.post('/', kategoriaController.createKategoria);

/**
 * @swagger
 * /kategoriak/{id}:
 *   put:
 *     summary: Kategória módosítása
 *     tags: [Kategóriák]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nev:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sikeres frissítés
 */
router.put('/:id', kategoriaController.updateKategoria);

/**
 * @swagger
 * /kategoriak/{id}:
 *   delete:
 *     summary: Kategória törlése
 *     tags: [Kategóriák]
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
router.delete('/:id', kategoriaController.deleteKategoria);

module.exports = router;
