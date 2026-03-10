const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authMiddleware } = require("../middlewares/auth");

/**
 * @swagger
 * /notifications/{userId}:
 *   get:
 *     summary: Felhasználó összes értesítésének lekérése
 *     tags: [Értesítések]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Értesítések listája
 */
router.get("/:userId", authMiddleware, notificationController.getNotifications);

/**
 * @swagger
 * /notifications/{id}/read:
 *   put:
 *     summary: Egy értesítés olvasottnak jelölése
 *     tags: [Értesítések]
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
router.put("/:id/read", authMiddleware, notificationController.markAsRead);

/**
 * @swagger
 * /notifications/all-read/{userId}:
 *   put:
 *     summary: Összes értesítés olvasottnak jelölése
 *     tags: [Értesítések]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sikeres frissítés
 */
router.put("/all-read/:userId", authMiddleware, notificationController.markAllAsRead);

module.exports = router;
