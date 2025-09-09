const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.login = async (req, res) => {
  debugger
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT payload (do not include sensitive info like passwordHash)
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // Sign the token and send it in the response
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use a secret key from your .env file
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
exports.refresh = async (req, res) => {
  res.status(501).json({ message: 'Refresh token logic not implemented' });
};

exports.me = async (req, res) => {
  try {
    // The `req.user.id` is populated by your authentication middleware
    const user = await User.findById(req.user.id).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};