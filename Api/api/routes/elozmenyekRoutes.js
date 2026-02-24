const express = require("express");
const router = express.Router();
const elozmenyekController = require("../controllers/elozmenyekController");
const authMiddleware = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Előzmények
 *   description: Megtekintett ajándékok előzményeinek kezelése
 */

/**
 * @swagger
 * /elozmenyek/{userId}:
 *   get:
 *     summary: Felhasználó böngészési előzményeinek lekérése
 *     tags: [Előzmények]
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
 *         description: Előzmények listája
 */
router.get("/:userId", authMiddleware, elozmenyekController.getElozmenyek);

/**
 * @swagger
 * /elozmenyek/{userId}:
 *   post:
 *     summary: Új ajándék hozzáadása az előzményekhez
 *     tags: [Előzmények]
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
 *         description: Hozzáadva az előzményekhez
 */
router.post("/:userId", authMiddleware, elozmenyekController.addElozmeny);

module.exports = router;
