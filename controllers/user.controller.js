const User = require('../models/user.model');

// GET /api/users
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// POST /api/users
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted' });
};