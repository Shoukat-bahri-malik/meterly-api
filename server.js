const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const {ConnectDB } = require('./db/db.config');

ConnectDB();
const app = express();
app.use(express.json());
app.use('/api/users', require('./routes/user.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






