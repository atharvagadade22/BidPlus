const express = require('express');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();

// Connect to the database
connectDB();

// ...existing code...

app.use('/api', apiRoutes);

// ...existing code...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
