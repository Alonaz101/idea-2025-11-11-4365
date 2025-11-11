// SCRUM-361: Mood schema definition
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
  moodId: { type: String, required: true, unique: true },
  moodName: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Mood', MoodSchema);
