// SCRUM-362: Mood related API route for POST /api/mood to submit mood and get recipes
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// POST /api/mood
// Receive mood from user, return recommended recipes based on moodTags
router.post('/', async (req, res) => {
  try {
    const { mood } = req.body;
    if (!mood) {
      return res.status(400).json({ error: 'Mood is required' });
    }
    
    // Find recipes with moodTags containing the mood
    const recipes = await Recipe.find({ moodTags: mood }).limit(10);
    return res.json({ recipes });
  } catch (error) {
    console.error('Error in POST /api/mood', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
