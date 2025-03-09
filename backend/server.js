require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); 


const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

mongoose.connect(process.env.MONGO_URI, {
});

app.use(cors()); 
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
    return res.status(400).send({ error: 'Invalid JSON' });
  }
  next();
});

app.use('/api', apiRoutes);
app.use('/api/users', userRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
