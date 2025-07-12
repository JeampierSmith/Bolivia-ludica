const router = require('express').Router();
const ctrl = require('../controllers/actividadesEspeciales.controller');

router.get('/', ctrl.getActividades);
router.get('/:id', ctrl.getActividad);
router.post('/', ctrl.createActividad);
router.put('/:id', ctrl.updateActividad);
router.delete('/:id', ctrl.deleteActividad);

module.exports = router;
