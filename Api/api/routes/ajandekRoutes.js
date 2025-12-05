const express = require('express');
const router = express.Router();
const ajandekController = require('../controllers/ajandekController');

router.get('/', ajandekController.getAjandekok);

router.post('/', ajandekController.createAjandek);

router.get('/:id', ajandekController.getAjandekById);

router.put('/:id', ajandekController.updateAjandek);

router.delete('/:id', ajandekController.deleteAjandek);

router.get('/alkalom/:alkalomNev', ajandekController.getAjandekokByAlkalom);
router.get('/stilus/:stilusNev', ajandekController.getAjandekokByStilus);
router.get('/celcsoport/:celcsoportNev', ajandekController.getAjandekokByCelcsoport);

module.exports = router;