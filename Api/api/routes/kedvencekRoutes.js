const express = require("express");
const router = express.Router();
const kedvencekController = require("../controllers/kedvencekController");
const authMiddleware = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Kedvencek
 *   description: Felhasználók kedvenc ajándékainak kezelése
 */

/**
 * @swagger
 * /kedvencek/{userId}:
 *   get:
 *     summary: Felhasználó kedvenceinek lekérése
 *     tags: [Kedvencek]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kedvenc ajándékok listája
 */
router.get("/:userId", authMiddleware, kedvencekController.getKedvencek);

/**
 * @swagger
 * /kedvencek/{userId}:
 *   post:
 *     summary: Ajándék hozzáadása a kedvencekhez
 *     tags: [Kedvencek]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ajandek_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Hozzáadva a kedvencekhez
 */
router.post("/:userId", authMiddleware, kedvencekController.addKedvenc);

/**
 * @swagger
 * /kedvencek/{userId}/{ajandekId}:
 *   delete:
 *     summary: Ajándék eltávolítása a kedvencekből
 *     tags: [Kedvencek]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: ajandekId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eltávolítva a kedvencekből
 */
router.delete("/:userId/:ajandekId", authMiddleware, kedvencekController.deleteKedvenc);

module.exports = router;