// SCRUM-361: Recipe schema definition
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  recipeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  moodTags: [{ type: String }],
  prepTime: { type: Number },
  nutritionInfo: {
    calories: Number,
    fat: Number,
    carbs: Number,
    protein: Number
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
