const express = require('express');
const router = express.Router();
const readingController = require('../controllers/reading.controller');

router.get('/', readingController.getAllReadings);
router.post('/', readingController.createReading);
router.post('/bulk', readingController.bulkUploadReadings);
router.get('/meter/:meterId', readingController.getReadingsByMeter);
router.put('/:id', readingController.updateReading);
router.delete('/:id', readingController.deleteReading);

module.exports = router;