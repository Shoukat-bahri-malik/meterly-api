const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

// POST /api/auth/register
exports.register = async (req, res) => {
  const { name, email, password, role, rights, isActive } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user instance
    user = new User({
      name,
      email,
      passwordHash,
      role,
      rights,
      isActive,
    });

    // Save the new user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided role matches the user's role in the database
    if (user.role !== role) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // This is the temporary success response without a JWT
    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// POST /api/auth/logout
exports.logout = async (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

// POST /api/auth/refresh
exports.refresh = async (req, res) => {
  res.status(501).json({ message: 'Refresh token logic not yet implemented' });
};

// GET /api/auth/me
exports.me = async (req, res) => {
  res.status(501).json({ message: 'Me endpoint not implemented without authentication middleware' });
};
