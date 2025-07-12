const router = require('express').Router();
const ctrl = require('../controllers/eventos.controller');

router.get('/', ctrl.getEventos);
router.get('/:id', ctrl.getEvento);
router.post('/', ctrl.createEvento);
router.put('/:id', ctrl.updateEvento);
router.delete('/:id', ctrl.deleteEvento);

module.exports = router;
