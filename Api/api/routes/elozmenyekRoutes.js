const express = require("express");
const router = express.Router();
const elozmenyekController = require("../controllers/elozmenyekController");

// Egy felhasználó előzményeinek lekérése
router.get("/:userId", elozmenyekController.getElozmenyek);

// Új előzmény hozzáadása (amikor pl. megnyit egy ajándékot)
router.post("/:userId", elozmenyekController.addElozmeny);

module.exports = router;
