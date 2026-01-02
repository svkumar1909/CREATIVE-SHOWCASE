const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth');
const artworkRoutes = require('./routes/artworks');

app.use('/api/auth', authRoutes);
app.use('/api/artworks', artworkRoutes);

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/creativeShowcase';

mongoose.connect(mongoURI)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server listening on http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error("DATABASE CONNECTION FAILED");
    console.error(err.message);
    process.exit(1);
  });
