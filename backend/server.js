require('dotenv').config(); // Add this line to load environment variables
const express = require('express');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

mongoose.connect(process.env.MONGO_URI, {
  // ...existing code...
});

app.use(express.json());

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
