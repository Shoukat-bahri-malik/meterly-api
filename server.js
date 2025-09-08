const express = require('express');
const mongoose = require('mongoose');
const {ConnectDB } = require('./db/db.config');


const app = express();
app.use(express.json());
app.use('/api/users', require('./routes/user.routes'));

mongoose.connect("mongodb+srv://apiuser:api123456@mybackend.utdk5bw.mongodb.net/?retryWrites=true&w=majority&appName=mybackend")
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});







