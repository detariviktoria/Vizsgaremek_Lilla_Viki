const express = require('express');
const router = express.Router();
const ajandekController = require('../controllers/ajandekController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');

router.get('/', ajandekController.getAjandekok);

router.post('/', authMiddleware, adminMiddleware, ajandekController.createAjandek);

router.get('/:id', ajandekController.getAjandekById);

router.put('/:id', authMiddleware, adminMiddleware, ajandekController.updateAjandek);

router.delete('/:id', authMiddleware, adminMiddleware, ajandekController.deleteAjandek);

router.get('/alkalom/:alkalomNev', ajandekController.getAjandekokByAlkalom);
router.get('/stilus/:stilusNev', ajandekController.getAjandekokByStilus);
router.get('/celcsoport/:celcsoportNev', ajandekController.getAjandekokByCelcsoport);

module.exports = router;