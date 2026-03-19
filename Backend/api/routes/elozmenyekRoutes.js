const express = require("express");
const router = express.Router();
const elozmenyekController = require("../controllers/elozmenyekController");

/**
 * @swagger
 * /elozmenyek/{userId}:
 *   get:
 *     summary: Felhasználó megtekintési előzményeinek lekérése
 *     tags: [Előzmények]
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
router.get("/:userId", elozmenyekController.getElozmenyek);

/**
 * @swagger
 * /elozmenyek/{userId}:
 *   post:
 *     summary: Új előzmény hozzáadása
 *     tags: [Előzmények]
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
 *         description: Előzmény mentve
 */
router.post("/:userId", elozmenyekController.addElozmeny);

module.exports = router;
