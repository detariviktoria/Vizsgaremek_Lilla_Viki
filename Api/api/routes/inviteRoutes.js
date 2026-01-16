const express = require('express');
const router = express.Router();
const inviteController = require('../controllers/inviteController');

router.post('/', inviteController.sendInvite);
router.get('/friends/:userId', inviteController.getInvitedFriends);

module.exports = router;