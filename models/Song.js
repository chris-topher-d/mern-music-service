const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: String,
  artist: String,
  album: String,
  artwork: String,
  genre: String,
  duration: String,
  path: String,
  albumOrder: Number
});

module.exports = Song = mongoose.model('Song', SongSchema);
