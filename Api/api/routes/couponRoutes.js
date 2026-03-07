const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");
const authMiddleware = require("../middlewares/auth");

/**
 * @swagger
 * /coupons/user/{userId}:
 *   get:
 *     summary: Felhasználó összes kuponjának lekérése
 *     tags: [Kuponok]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kuponok listája
 */
router.get("/user/:userId", authMiddleware, couponController.getUserCoupons);

module.exports = router;
