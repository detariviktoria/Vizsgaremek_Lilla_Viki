const express = require("express");
const router = express.Router();
const kedvencekController = require("../controllers/kedvencekController");

router.get("/:userId", kedvencekController.getKedvencek);

router.post("/:userId", kedvencekController.addKedvenc);

router.delete("/:userId/:ajandekId", kedvencekController.deleteKedvenc);

module.exports = router;