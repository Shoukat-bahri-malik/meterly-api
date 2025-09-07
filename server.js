const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./db/db.config');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', require('./routes/user.routes'));

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


