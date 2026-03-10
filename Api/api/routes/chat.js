const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

/**
 * @swagger
 * /chat/send:
 *   post:
 *     summary: Új üzenet küldése és mentése
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from_user_id:
 *                 type: integer
 *               to_user_id:
 *                 type: integer
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Üzenet sikeresen elmentve
 */
router.post("/send", chatController.sendMessage);

/**
 * @swagger
 * /chat/history/{user1Id}/{user2Id}:
 *   get:
 *     summary: Két felhasználó közötti üzenetváltások lekérése
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: user1Id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: user2Id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Üzenetek listája
 */
router.get("/history/:user1Id/:user2Id", chatController.getHistory);

/**
 * @swagger
 * /chat/unread/{userId}:
 *   get:
 *     summary: Olvasatlan üzenetek száma
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Darabszám
 */
router.get("/unread/:userId", chatController.getUnreadCount);

/**
 * @swagger
 * /chat/unread-senders/{userId}:
 *   get:
 *     summary: Olvasatlan üzenetek feladóinak listája
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Felhasználó ID-k listája
 */
router.get("/unread-senders/:userId", chatController.getUnreadSenders);

/**
 * @swagger
 * /chat/read:
 *   post:
 *     summary: Üzenetek olvasottnak jelölése
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromUserId:
 *                 type: integer
 *               toUserId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sikeres frissítés
 */
router.post("/read", chatController.markAsRead);

module.exports = router;
