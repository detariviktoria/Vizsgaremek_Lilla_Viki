const express = require("express");
const router = express.Router();
const kedvencekController = require("../controllers/kedvencekController");

/**
 * @swagger
 * /kedvencek/{userId}:
 *   get:
 *     summary: Felhasználó kedvenceinek lekérése
 *     tags: [Kedvencek]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kedvencek listája
 */
router.get("/:userId", kedvencekController.getKedvencek);

/**
 * @swagger
 * /kedvencek/{userId}:
 *   post:
 *     summary: Új kedvenc hozzáadása
 *     tags: [Kedvencek]
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
 *         description: Kedvenc mentve
 */
router.post("/:userId", kedvencekController.addKedvenc);

/**
 * @swagger
 * /kedvencek/{userId}/{ajandekId}:
 *   delete:
 *     summary: Kedvenc eltávolítása
 *     tags: [Kedvencek]
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
 *         description: Sikeres törlés
 */
router.delete("/:userId/:ajandekId", kedvencekController.deleteKedvenc);

module.exports = router;
