/* SCRUM-360: Backend server setup with Express, MongoDB connection, and basic API structure as per MVP architecture */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const moodRoutes = require('./routes/moodRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/moodrecipes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// API routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mood', moodRoutes);

// HTTPS enforcement placeholder (would be configured in production server settings or reverse proxy)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
