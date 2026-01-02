const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Field must be named 'user'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Artwork', ArtworkSchema);