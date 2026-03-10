const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const ajandekController = require('../controllers/ajandekController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const validateAjandek = [
  body('nev').notEmpty().withMessage('A név kötelező'),
  body('ar').isNumeric().withMessage('Az árnak számnak kell lennie'),
  body('kategoria').notEmpty().withMessage('A kategória kötelező'),
  validate
];

router.get('/', ajandekController.getAjandekok);

<<<<<<< Updated upstream
router.post('/', authMiddleware, adminMiddleware, ajandekController.createAjandek);

router.get('/:id', ajandekController.getAjandekById);

router.put('/:id', authMiddleware, adminMiddleware, ajandekController.updateAjandek);
=======
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
router.post('/', authMiddleware, adminMiddleware, validateAjandek, ajandekController.createAjandek);

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
router.put('/:id', authMiddleware, adminMiddleware, validateAjandek, ajandekController.updateAjandek);
>>>>>>> Stashed changes

router.delete('/:id', authMiddleware, adminMiddleware, ajandekController.deleteAjandek);

router.get('/alkalom/:alkalomNev', ajandekController.getAjandekokByAlkalom);
router.get('/stilus/:stilusNev', ajandekController.getAjandekokByStilus);
router.get('/celcsoport/:celcsoportNev', ajandekController.getAjandekokByCelcsoport);

module.exports = router;