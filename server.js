const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { ConnectDB } = require('./utils/db');

ConnectDB();
const app = express();

// Correct way to add CORS
const cors = require('cors');
app.use(cors());


app.use(express.json());

// Add all routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/meters', require('./routes/meter.routes'));
app.use('/api/readings', require('./routes/reading.routes'));
app.use('/api/reports', require('./routes/report.routes'));
// Add more routes as needed (e.g., billing)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Meterly API');
});