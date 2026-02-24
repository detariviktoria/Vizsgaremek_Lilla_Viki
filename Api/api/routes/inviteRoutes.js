const express = require('express');
const router = express.Router();
const inviteController = require('../controllers/inviteController');

/**
 * @swagger
 * tags:
 *   name: Meghívók
 *   description: Barátok meghívása és ajánlói rendszer
 */

/**
 * @swagger
 * /invite:
 *   post:
 *     summary: Meghívó küldése e-mailben
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
 *     summary: Meghívott barátok listájának lekérése
 *     tags: [Meghívók]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Meghívott barátok listája
 */
router.get('/friends/:userId', inviteController.getInvitedFriends);

module.exports = router;