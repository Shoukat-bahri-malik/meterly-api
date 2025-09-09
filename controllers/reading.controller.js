const Reading = require('../models/reading.model');

// GET /api/readings
exports.getAllReadings = async (req, res) => {
  const readings = await Reading.find();
  res.json(readings);
};

// POST /api/readings
exports.createReading = async (req, res) => {
  const reading = new Reading(req.body);
  await reading.save();
  res.status(201).json(reading);
};

// POST /api/readings/bulk
exports.bulkUploadReadings = async (req, res) => {
  const readings = await Reading.insertMany(req.body.readings);
  res.status(201).json(readings);
};

// GET /api/readings/meter/:meterId
exports.getReadingsByMeter = async (req, res) => {
  const readings = await Reading.find({ meterId: req.params.meterId });
  res.json(readings);
};

// GET /api/readings/:id
exports.getReadingById = async (req, res) => {
  const reading = await Reading.findById(req.params.id);
  if (!reading) return res.status(404).json({ error: 'Reading not found' });
  res.json(reading);
};

// PUT /api/readings/:id
exports.updateReading = async (req, res) => {
  const reading = await Reading.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!reading) return res.status(404).json({ error: 'Reading not found' });
  res.json(reading);
};

// DELETE /api/readings/:id
exports.deleteReading = async (req, res) => {
  const reading = await Reading.findByIdAndDelete(req.params.id);
  if (!reading) return res.status(404).json({ error: 'Reading not found' });
  res.json({ message: 'Reading deleted' });
};