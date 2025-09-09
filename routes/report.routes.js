const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');

router.get('/', reportController.getAllReports);
router.post('/generate', reportController.generateReport);
router.get('/:id/download', reportController.downloadReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;