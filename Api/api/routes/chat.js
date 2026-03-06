const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

// Üzenet küldése és mentése adatbázisba
router.post("/send", chatController.sendMessage);

// Két felhasználó közötti üzenet előzmények lekérése
router.get("/history/:user1Id/:user2Id", chatController.getHistory);

// Olvasatlan üzenetek száma
router.get("/unread/:userId", chatController.getUnreadCount);

// Olvasatlan üzenetek feladóinak listája
router.get("/unread-senders/:userId", chatController.getUnreadSenders);

// Üzenetek olvasottnak jelölése
router.post("/read", chatController.markAsRead);

module.exports = router;

