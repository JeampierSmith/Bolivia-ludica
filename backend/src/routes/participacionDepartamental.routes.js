const router = require('express').Router();
const ctrl = require('../controllers/participacionDepartamental.controller');

router.get('/', ctrl.getParticipaciones);
router.get('/:id', ctrl.getParticipacion);
router.post('/', ctrl.createParticipacion);
router.put('/:id', ctrl.updateParticipacion);
router.delete('/:id', ctrl.deleteParticipacion);

module.exports = router;
