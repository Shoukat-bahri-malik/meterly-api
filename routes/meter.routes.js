const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meter.controller');

router.get('/', meterController.getAllMeters);
router.post('/', meterController.createMeter);
router.get('/:id', meterController.getMeterById);
router.put('/:id', meterController.updateMeter);
router.delete('/:id', meterController.deleteMeter);

module.exports = router;