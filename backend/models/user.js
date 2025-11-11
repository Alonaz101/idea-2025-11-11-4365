// SCRUM-361: User schema definition
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  preferences: { type: [String], default: [] },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
});

module.exports = mongoose.model('User', UserSchema);
