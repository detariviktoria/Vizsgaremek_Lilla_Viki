const express = require('express');
const router = express.Router();
const inviteController = require('../controllers/inviteController');
const { body, param } = require('express-validator');
const validate = require('../middlewares/validate');

const validateSendInvite = [
  body('email').isEmail().withMessage('Érvénytelen email cím'),
  body('userId').isInt({ min: 1 }).withMessage('Érvénytelen küldő ID'),
  validate,
];

const validateUserIdParam = [
  param('userId').isInt({ min: 1 }).withMessage('Érvénytelen felhasználó ID'),
  validate,
];

router.post('/', validateSendInvite, inviteController.sendInvite);
router.get('/friends/:userId', validateUserIdParam, inviteController.getInvitedFriends);
router.get('/coupons/:userId', validateUserIdParam, inviteController.getCoupons);

module.exports = router;