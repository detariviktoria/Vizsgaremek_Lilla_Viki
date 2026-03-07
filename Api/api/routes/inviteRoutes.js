const express = require('express');
const router = express.Router();
const inviteController = require('../controllers/inviteController');

/**
 * @swagger
 * /invite:
 *   post:
 *     summary: Meghívó küldése emailben
 *     tags: [Meghívók]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Meghívó elküldve
 */
router.post('/', inviteController.sendInvite);

/**
 * @swagger
 * /invite/friends/{userId}:
 *   get:
 *     summary: Meghívott barátok listája és állapotuk
 *     tags: [Meghívók]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Barátok listája
 */
router.get('/friends/:userId', inviteController.getInvitedFriends);

module.exports = router;
