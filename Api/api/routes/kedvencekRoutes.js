const express = require("express");
const router = express.Router();
const kedvencekController = require("../controllers/kedvencekController");

router.get("/:userId/kedvencek", kedvencekController.getKedvencek);
router.post("/:userId/kedvencek", kedvencekController.addKedvenc);
router.delete("/:userId/kedvencek/:ajandekId", kedvencekController.deleteKedvenc);

module.exports = router;