const express = require('express');
const router = express.Router();
const kuponController = require('../controllers/kuponController');
const { authMiddleware } = require("../middlewares/auth");

/**
 * @swagger
 * /coupons/user/{userId}:
 *   get:
 *     summary: Felhasználó összes kuponjának lekérése (meghívókból)
 *     tags: [Kuponok]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kuponok listája
 */
router.get("/user/:userId", authMiddleware, kuponController.getUserCouponsFromInvites);

/**
 * @swagger
 * /kuponok:
 *   get:
 *     summary: Összes kupon lekérése
 *     tags: [Kuponok]
 *     responses:
 *       200:
 *         description: Kuponok listája
 */
router.get('/', kuponController.getKuponok);

/**
 * @swagger
 * /kuponok/{id}:
 *   get:
 *     summary: Egy kupon lekérése ID alapján
 *     tags: [Kuponok]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kupon adatai
 */
router.get('/:id', kuponController.getKuponById);

/**
 * @swagger
 * /kuponok:
 *   post:
 *     summary: Új kupon létrehozása
 *     tags: [Kuponok]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coupon_code:
 *                 type: string
 *               discount:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               status:
 *                 type: string
 *               expiry_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Kupon létrehozva
 */
router.post('/', kuponController.createKupon);

/**
 * @swagger
 * /kuponok/{id}:
 *   put:
 *     summary: Kupon módosítása
 *     tags: [Kuponok]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sikeres frissítés
 */
router.put('/:id', kuponController.updateKupon);

/**
 * @swagger
 * /kuponok/{id}:
 *   delete:
 *     summary: Kupon törlése
 *     tags: [Kuponok]
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
router.delete('/:id', kuponController.deleteKupon);

module.exports = router;
