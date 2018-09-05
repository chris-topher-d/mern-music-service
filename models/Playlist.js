const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  title: String,
  tracks: []
});

module.exports = Playlist = mongoose.model('Playlist', PlaylistSchema);
