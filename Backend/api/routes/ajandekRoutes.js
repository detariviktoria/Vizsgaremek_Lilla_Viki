const express = require('express');
const router = express.Router();
const ajandekController = require('../controllers/ajandekController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');

/**
 * @swagger
 * /ajandekok:
 *   get:
 *     summary: Összes ajándék lekérése
 *     tags: [Ajándékok]
 *     responses:
 *       200:
 *         description: Ajándékok listája
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ajandek'
 */
router.get('/', ajandekController.getAjandekok);

/**
 * @swagger
 * /ajandekok/{id}:
 *   get:
 *     summary: Egy ajándék lekérése ID alapján
 *     tags: [Ajándékok]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Az ajándék adatai
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ajandek'
 *       404:
 *         description: Az ajándék nem található
 */
router.get('/:id', ajandekController.getAjandekById);

/**
 * @swagger
 * /ajandekok:
 *   post:
 *     summary: Új ajándék felvétele (Admin)
 *     tags: [Ajándékok]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ajandek'
 *     responses:
 *       201:
 *         description: Ajándék létrehozva
 */
router.post('/', ajandekController.createAjandek);

/**
 * @swagger
 * /ajandekok/{id}:
 *   put:
 *     summary: Ajándék adatainak módosítása (Admin)
 *     tags: [Ajándékok]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ajandek'
 *     responses:
 *       200:
 *         description: Sikeres frissítés
 */
router.put('/:id', ajandekController.updateAjandek);

/**
 * @swagger
 * /ajandekok/{id}:
 *   delete:
 *     summary: Ajándék törlése (Admin)
 *     tags: [Ajándékok]
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
router.delete('/:id', ajandekController.deleteAjandek);

/**
 * @swagger
 * /ajandekok/alkalom/{alkalomNev}:
 *   get:
 *     summary: Ajándékok lekérése alkalom szerint
 *     tags: [Ajándékok]
 *     parameters:
 *       - in: path
 *         name: alkalomNev
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ajándékok listája
 */
router.get('/alkalom/:alkalomNev', ajandekController.getAjandekokByAlkalom);

/**
 * @swagger
 * /ajandekok/stilus/{stilusNev}:
 *   get:
 *     summary: Ajándékok lekérése stílus szerint
 *     tags: [Ajándékok]
 *     parameters:
 *       - in: path
 *         name: stilusNev
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ajándékok listája
 */
router.get('/stilus/:stilusNev', ajandekController.getAjandekokByStilus);

/**
 * @swagger
 * /ajandekok/celcsoport/{celcsoportNev}:
 *   get:
 *     summary: Ajándékok lekérése célcsoport szerint
 *     tags: [Ajándékok]
 *     parameters:
 *       - in: path
 *         name: celcsoportNev
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ajándékok listája
 */
router.get('/celcsoport/:celcsoportNev', ajandekController.getAjandekokByCelcsoport);

module.exports = router;
