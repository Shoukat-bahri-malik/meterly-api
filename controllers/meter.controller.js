const Meter = require('../models/meter.model');

// GET /api/meters
exports.getAllMeters = async (req, res) => {
  const meters = await Meter.find();
  res.json(meters);
};

// POST /api/meters
exports.createMeter = async (req, res) => {
  const meter = new Meter(req.body);
  await meter.save();
  res.status(201).json(meter);
};

// GET /api/meters/:id
exports.getMeterById = async (req, res) => {
  const meter = await Meter.findById(req.params.id);
  if (!meter) return res.status(404).json({ error: 'Meter not found' });
  res.json(meter);
};

// PUT /api/meters/:id
exports.updateMeter = async (req, res) => {
  const meter = await Meter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!meter) return res.status(404).json({ error: 'Meter not found' });
  res.json(meter);
};

// DELETE /api/meters/:id
exports.deleteMeter = async (req, res) => {
  const meter = await Meter.findByIdAndDelete(req.params.id);
  if (!meter) return res.status(404).json({ error: 'Meter not found' });
  res.json({ message: 'Meter deleted' });
};