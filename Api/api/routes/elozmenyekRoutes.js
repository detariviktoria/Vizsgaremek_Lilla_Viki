const express = require("express");
const router = express.Router();
const elozmenyekController = require("../controllers/elozmenyekController");

// Lekérés
router.get("/:userId", elozmenyekController.getElozmenyek);

// Új előzmény hozzáadása
router.post("/:userId", elozmenyekController.addElozmeny);

module.exports = router;
