const express = require('express');
const router = express.Router();
const ajandekController = require('../controllers/ajandekController');
const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");
const { body } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Ajándékok
 *   description: Ajándékok kezelése és keresése
 */

/**
 * @swagger
 * /ajandekok:
 *   get:
 *     summary: Összes ajándék lekérése
 *     tags: [Ajándékok]
 *     responses:
 *       200:
 *         description: Ajándékok listája
 */
router.get('/', ajandekController.getAjandekok);

/**
 * @swagger
 * /ajandekok:
 *   post:
 *     summary: Új ajándék létrehozása (Admin)
 *     tags: [Ajándékok]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nev:
 *                 type: string
 *               ar:
 *                 type: integer
 *               leiras:
 *                 type: string
 *               kategoria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ajándék létrehozva
 *       403:
 *         description: Nincs jogosultság
 */
router.post('/', [
    authMiddleware, 
    adminMiddleware,
    body('nev').notEmpty().withMessage('A név megadása kötelező!'),
    body('ar').isInt({ min: 0 }).withMessage('Az árnak pozitív számnak kell lennie!'),
    body('kategoria').isIn(['tárgy', 'élmény']).withMessage('Érvénytelen kategória!')
], ajandekController.createAjandek);

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
 */
router.get('/:id', ajandekController.getAjandekById);

router.put('/:id', [
    authMiddleware, 
    adminMiddleware,
    body('nev').optional().notEmpty().withMessage('A név nem lehet üres!'),
    body('ar').optional().isInt({ min: 0 }).withMessage('Az árnak pozitív számnak kell lennie!')
], ajandekController.updateAjandek);

/**
 * @swagger
 * /ajandekok/{id}:
 *   delete:
 *     summary: Ajándék törlése (Admin)
 *     tags: [Ajándékok]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ajándék törölve
 */
router.delete('/:id', authMiddleware, adminMiddleware, ajandekController.deleteAjandek);

/**
 * @swagger
 * /ajandekok/alkalom/{alkalomNev}:
 *   get:
 *     summary: Ajándékok szűrése alkalom szerint
 *     tags: [Ajándékok]
 *     parameters:
 *       - in: path
 *         name: alkalomNev
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Szűrt ajándékok listája
 */
router.get('/alkalom/:alkalomNev', ajandekController.getAjandekokByAlkalom);
router.get('/stilus/:stilusNev', ajandekController.getAjandekokByStilus);
router.get('/celcsoport/:celcsoportNev', ajandekController.getAjandekokByCelcsoport);

module.exports = router;