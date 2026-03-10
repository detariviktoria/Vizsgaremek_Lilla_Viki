const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Felhasználó értesítései
router.get("/:userId", notificationController.getNotifications);

// Értesítés olvasottnak jelölése
router.post("/:id/read", notificationController.markAsRead);

// Összes értesítés olvasottnak jelölése
router.post("/user/:userId/read-all", notificationController.markAllAsRead);

module.exports = router;
