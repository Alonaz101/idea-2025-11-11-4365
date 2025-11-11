// SCRUM-362: Recipe API routes - GET /api/recipes
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// GET /api/recipes
// Retrieve recipes, optional query filter: moodTags
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.mood) {
      filter.moodTags = req.query.mood;
    }
    const recipes = await Recipe.find(filter).limit(20);
    res.json({ recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
