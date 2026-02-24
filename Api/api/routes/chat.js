const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Valós idejű üzenetküldés és előzmények
 */

/**
 * @swagger
 * /chat/send:
 *   post:
 *     summary: Üzenet küldése és mentése
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
 *         description: Üzenet elküldve
 */
router.post("/send", chatController.sendMessage);

/**
 * @swagger
 * /chat/history/{user1Id}/{user2Id}:
 *   get:
 *     summary: Üzenet előzmények lekérése két felhasználó között
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

router.get("/unread/:userId", chatController.getUnreadCount);
router.get("/unread-senders/:userId", chatController.getUnreadSenders);
router.post("/read", chatController.markAsRead);

module.exports = router;

