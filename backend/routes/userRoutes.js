// SCRUM-362: User API routes
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST /api/users - Create user profile
router.post('/', async (req, res) => {
  try {
    const { userId, name, email, preferences } = req.body;
    if (!userId || !name || !email) {
      return res.status(400).json({ error: 'Missing required user details' });
    }
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const newUser = new User({ userId, name, email, preferences: preferences || [], favorites: [] });
    await newUser.save();
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/:id/favorites - Get user's favorite recipes
router.get('/:id/favorites', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id }).populate('favorites');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/users/:id/favorites - Add recipe to favorites
router.post('/:id/favorites', async (req, res) => {
  try {
    const { recipeId } = req.body;
    if (!recipeId) {
      return res.status(400).json({ error: 'recipeId is required' });
    }
    const user = await User.findOne({ userId: req.params.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }
    res.status(200).json({ message: 'Recipe added to favorites' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
